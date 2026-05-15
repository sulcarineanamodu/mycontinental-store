import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const SERVER_IP = '66.29.141.37';
const WC_DOMAIN = 'www.mycontinentalfoodstore.co.uk';

function wcGet(path: string): Promise<unknown> {
  const auth = 'Basic ' + Buffer.from(
    `${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`
  ).toString('base64');

  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname: SERVER_IP, port: 443, path, method: 'GET',
        headers: { Host: WC_DOMAIN, Authorization: auth, 'Content-Type': 'application/json' },
        rejectUnauthorized: false, servername: WC_DOMAIN },
      (res) => {
        if (res.statusCode && res.statusCode >= 400) { reject(new Error(`WC API ${res.statusCode}`)); return; }
        let data = '';
        res.on('data', (chunk: Buffer) => { data += chunk.toString(); });
        res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid JSON')); } });
      }
    );
    req.setTimeout(30_000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.on('error', reject);
    req.end();
  });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [product, related] = await Promise.all([
      wcGet(`/wp-json/wc/v3/products/${id}`),
      wcGet(`/wp-json/wc/v3/products?per_page=4&orderby=date&order=desc&exclude=${id}`),
    ]);
    return NextResponse.json({ product, related }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    console.error('Product API error:', error);
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}
