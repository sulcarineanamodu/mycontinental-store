import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const SERVER_IP = '66.29.141.37';
const WC_DOMAIN = 'www.mycontinentalfoodstore.co.uk';

function wcGet(path: string): Promise<unknown> {
  const consumerKey    = process.env.WOOCOMMERCE_CONSUMER_KEY    || '';
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';
  const auth = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: SERVER_IP,
        port: 443,
        path,
        method: 'GET',
        headers: { Host: WC_DOMAIN, Authorization: auth, 'Content-Type': 'application/json' },
        rejectUnauthorized: false,
        servername: WC_DOMAIN,
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`WC API ${res.statusCode}`));
          return;
        }
        let data = '';
        res.on('data', (chunk: Buffer) => { data += chunk.toString(); });
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch { reject(new Error(`Invalid JSON: ${data.slice(0, 100)}`)); }
        });
      }
    );
    req.setTimeout(30_000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.on('error', reject);
    req.end();
  });
}

export async function GET(request: NextRequest) {
  try {
    const limit = request.nextUrl.searchParams.get('limit') || '8';

    let data = await wcGet(`/wp-json/wc/v3/products?featured=true&per_page=${limit}`) as unknown[];

    if (!data || data.length === 0) {
      data = await wcGet(`/wp-json/wc/v3/products?per_page=${limit}&orderby=date&order=desc`) as unknown[];
    }

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    console.error('Featured products API error:', error);
    return NextResponse.json({ error: 'Failed to fetch featured products' }, { status: 500 });
  }
}
