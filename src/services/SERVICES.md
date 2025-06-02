# Services Directory

Business logic and API communication layer.

## Architecture:

```
services/
├── api/              # API clients
│   ├── http.ts       # Axios instance
│   └── websocket.ts  # Socket.io setup
├── auth.service.ts   # Authentication methods
└── user.service.ts   # User-related operations
```

## Service Example:

```ts
// services/product.service.ts
export default class ProductService {
  constructor(private http: HttpClient) {}

  async getFeatured(): Promise<Product[]> {
    return this.http.get('/products/featured')
  }

  async search(query: string): Promise<ProductSearchResult> {
    return this.http.get(`/products?q=${query}`)
  }
}
```

## Dependency Injection:

Register services in `app.config.globalProperties`:

```ts
// main.ts
const http = new AxiosClient(/* config */)
app.provide('http', http)
```

## Testing Strategy:

1. Mock HTTP responses:
   ```ts
   vi.mock('@/services/http', () => ({
     get: vi.fn(() => mockProducts),
   }))
   ```
2. Verify service calls:
   ```ts
   expect(httpClient.post).toHaveBeenCalledWith('/login', expect.any(Object))
   ```

## Rules:

✅ **Do**:

- Type all method arguments and returns
- Document error cases with `@throws`
- Handle API transformations here (not in components)

❌ **Don't**:

- Store component state
- Access Vuex/Pinia directly
