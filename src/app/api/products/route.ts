import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const SERVER_IP = '66.29.141.37';
const WC_DOMAIN = 'www.mycontinentalfoodstore.co.uk';

function wcGet(path: string): Promise<{ data: unknown; total: number; totalPages: number }> {
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
        const total      = parseInt(res.headers['x-wp-total']      as string || '0', 10);
        const totalPages = parseInt(res.headers['x-wp-totalpages'] as string || '1', 10);
        let raw = '';
        res.on('data', (chunk: Buffer) => { raw += chunk.toString(); });
        res.on('end', () => {
          try { resolve({ data: JSON.parse(raw), total, totalPages }); }
          catch { reject(new Error(`Invalid JSON: ${raw.slice(0, 100)}`)); }
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
    const s        = request.nextUrl.searchParams;
    const page     = s.get('page')     || '1';
    const perPage  = s.get('per_page') || '24';
    const search   = s.get('search');
    const category = s.get('category');
    const onSale   = s.get('on_sale');
    const orderby  = s.get('orderby')  || 'date';
    const order    = s.get('order')    || 'desc';

    const params = new URLSearchParams({ page, per_page: perPage, orderby, order });
    if (search)          params.append('search',   search);
    if (category)        params.append('category', category);
    if (onSale === 'true') params.append('on_sale', 'true');

    const { data, total, totalPages } = await wcGet(`/wp-json/wc/v3/products?${params}`);

    return NextResponse.json({ products: data, total, totalPages }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
