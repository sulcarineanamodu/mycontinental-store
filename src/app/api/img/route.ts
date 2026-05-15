import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const SERVER_IP = '66.29.141.37';
const WC_DOMAIN = 'www.mycontinentalfoodstore.co.uk';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url', { status: 400 });

  // Only proxy images from our own domain
  if (!url.includes('mycontinentalfoodstore.co.uk')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Extract the path from the URL
  const path = url.replace(/^https?:\/\/[^/]+/, '');

  return new Promise<NextResponse>((resolve) => {
    const req = https.request(
      {
        hostname: SERVER_IP,
        port: 443,
        path,
        method: 'GET',
        headers: {
          Host: WC_DOMAIN,
          'User-Agent': 'Mozilla/5.0',
          Accept: 'image/*,*/*',
        },
        rejectUnauthorized: false,
        servername: WC_DOMAIN,
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          resolve(new NextResponse('Image not found', { status: res.statusCode }));
          return;
        }

        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const contentType = res.headers['content-type'] || 'image/jpeg';
          resolve(
            new NextResponse(buffer, {
              status: 200,
              headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
                'Content-Length': String(buffer.length),
              },
            })
          );
        });
      }
    );

    req.setTimeout(15_000, () => {
      req.destroy();
      resolve(new NextResponse('Timeout', { status: 504 }));
    });
    req.on('error', () => resolve(new NextResponse('Error', { status: 502 })));
    req.end();
  });
}
