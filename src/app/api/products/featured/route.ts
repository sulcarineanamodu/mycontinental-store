import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!baseUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'WooCommerce credentials not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '8';

    const credentials = `${consumerKey}:${consumerSecret}`;
    const authHeader = 'Basic ' + Buffer.from(credentials).toString('base64');

    const featuredUrl = `${baseUrl}/wp-json/wc/v3/products?featured=true&per_page=${limit}`;

    const response = await fetch(featuredUrl, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `WooCommerce API error: ${response.status}` },
        { status: response.status }
      );
    }

    let data = await response.json();

    if (!data || data.length === 0) {
      const recentUrl = `${baseUrl}/wp-json/wc/v3/products?per_page=${limit}&orderby=date&order=desc`;
      const recentResponse = await fetch(recentUrl, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (recentResponse.ok) {
        data = await recentResponse.json();
      }
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Featured products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}
