import { WooCommerceProduct, WooCommerceCategory } from './types';

const baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '';
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  headers?: Record<string, string>;
}

function getAuthHeader(): string {
  const credentials = `${consumerKey}:${consumerSecret}`;
  return 'Basic ' + Buffer.from(credentials).toString('base64');
}

async function fetchFromWooCommerce(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const url = `${baseUrl}/wp-json/wc/v3${endpoint}`;

  const headers: Record<string, string> = {
    Authorization: getAuthHeader(),
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(
      `WooCommerce API error: ${response.status} ${response.statusText}`
    );
  }

  return response;
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

      const response = await fetchFromWooCommerce(endpoint);
      return response.json();
    },

    async get(productId: number): Promise<WooCommerceProduct> {
      const response = await fetchFromWooCommerce(`/products/${productId}`);
      return response.json();
    },

    async getBySlug(slug: string): Promise<WooCommerceProduct | null> {
      const products = await this.list({ search: slug });
      return products.find((p) => p.slug === slug) || null;
    },

    async featured(limit: number = 10): Promise<WooCommerceProduct[]> {
      const response = await fetchFromWooCommerce(
        `/products?featured=true&per_page=${limit}`
      );
      return response.json();
    },

    async onSale(limit: number = 10): Promise<WooCommerceProduct[]> {
      const response = await fetchFromWooCommerce(
        `/products?on_sale=true&per_page=${limit}`
      );
      return response.json();
    },

    async byCategory(categoryId: number, params?: { limit?: number; page?: number }): Promise<WooCommerceProduct[]> {
      const response = await fetchFromWooCommerce(
        `/products?category=${categoryId}&per_page=${params?.limit || 20}&page=${params?.page || 1}`
      );
      return response.json();
    },
  },

  categories: {
    async list(params?: { per_page?: number }): Promise<WooCommerceCategory[]> {
      const queryString = params?.per_page ? `?per_page=${params.per_page}` : '';
      const response = await fetchFromWooCommerce(`/products/categories${queryString}`);
      return response.json();
    },

    async get(categoryId: number): Promise<WooCommerceCategory> {
      const response = await fetchFromWooCommerce(`/products/categories/${categoryId}`);
      return response.json();
    },
  },

  search: {
    async products(query: string, limit: number = 20): Promise<WooCommerceProduct[]> {
      const response = await fetchFromWooCommerce(
        `/products?search=${encodeURIComponent(query)}&per_page=${limit}`
      );
      return response.json();
    },
  },
};
