import https from 'https';
import { WooCommerceProduct, WooCommerceCategory } from './types';

// Connect directly to the server IP to bypass Cloudflare WAF
// The domain's DNS goes through Cloudflare which blocks /wp-json/ from external IPs.
// By connecting to the origin IP with the correct Host header, we skip Cloudflare entirely.
const SERVER_IP   = '66.29.141.37';
const WC_DOMAIN   = 'www.mycontinentalfoodstore.co.uk';
const consumerKey    = process.env.WOOCOMMERCE_CONSUMER_KEY    || '';
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

function getAuthHeader(): string {
  return 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
}

async function fetchFromWooCommerce(endpoint: string): Promise<unknown> {
  const path = `/wp-json/wc/v3${endpoint}`;

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: SERVER_IP,
        port: 443,
        path,
        method: 'GET',
        headers: {
          Host: WC_DOMAIN,
          Authorization: getAuthHeader(),
          'Content-Type': 'application/json',
        },
        rejectUnauthorized: false, // cert is issued for the domain, not the IP
        servername: WC_DOMAIN,    // SNI — tells the server which cert to use
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

export const woocommerce = {
  products: {
    async list(params?: {
      page?: number;
      per_page?: number;
      search?: string;
      category?: number;
      orderby?: string;
      order?: 'asc' | 'desc';
    }): Promise<WooCommerceProduct[]> {
      const searchParams = new URLSearchParams();

      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
      if (params?.search) searchParams.append('search', params.search);
      if (params?.category) searchParams.append('category', params.category.toString());
      if (params?.orderby) searchParams.append('orderby', params.orderby);
      if (params?.order) searchParams.append('order', params.order);

      const queryString = searchParams.toString();
      const endpoint = `/products${queryString ? `?${queryString}` : ''}`;

      return fetchFromWooCommerce(endpoint) as Promise<WooCommerceProduct[]>;
    },

    async get(productId: number): Promise<WooCommerceProduct> {
      return fetchFromWooCommerce(`/products/${productId}`) as Promise<WooCommerceProduct>;
    },

    async getBySlug(slug: string): Promise<WooCommerceProduct | null> {
      const products = await this.list({ search: slug });
      return products.find((p) => p.slug === slug) || null;
    },

    async featured(limit: number = 10): Promise<WooCommerceProduct[]> {
      return fetchFromWooCommerce(
        `/products?featured=true&per_page=${limit}`
      ) as Promise<WooCommerceProduct[]>;
    },

    async onSale(limit: number = 10): Promise<WooCommerceProduct[]> {
      return fetchFromWooCommerce(
        `/products?on_sale=true&per_page=${limit}`
      ) as Promise<WooCommerceProduct[]>;
    },

    async byCategory(categoryId: number, params?: { limit?: number; page?: number }): Promise<WooCommerceProduct[]> {
      return fetchFromWooCommerce(
        `/products?category=${categoryId}&per_page=${params?.limit || 20}&page=${params?.page || 1}`
      ) as Promise<WooCommerceProduct[]>;
    },
  },

  categories: {
    async list(params?: { per_page?: number }): Promise<WooCommerceCategory[]> {
      const queryString = params?.per_page ? `?per_page=${params.per_page}` : '';
      return fetchFromWooCommerce(`/products/categories${queryString}`) as Promise<WooCommerceCategory[]>;
    },

    async get(categoryId: number): Promise<WooCommerceCategory> {
      return fetchFromWooCommerce(`/products/categories/${categoryId}`) as Promise<WooCommerceCategory>;
    },
  },

  search: {
    async products(query: string, limit: number = 20): Promise<WooCommerceProduct[]> {
      return fetchFromWooCommerce(
        `/products?search=${encodeURIComponent(query)}&per_page=${limit}`
      ) as Promise<WooCommerceProduct[]>;
    },
  },
};
