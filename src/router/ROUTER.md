# Router Directory

Vue Router configuration with lazy loading.

## Core Files:

- `index.ts` - Main router instance
- `routes/` - Split route definitions:
  ```ts
  // routes/auth.ts
  export default [
    {
      path: '/login',
      component: () => import('@/views/AuthLogin.vue'),
      meta: { layout: 'EmptyLayout' },
    },
  ]
  ```

## Advanced:

- **Route Guards**: Authentication in `guards/auth.ts`
- **Scroll Behavior**: Custom logic in `scrollBehavior.ts`
- **Type Extensions**: Augment `meta` in `types.d.ts`:
  ```ts
  declare module 'vue-router' {
    interface RouteMeta {
      requiresAuth?: boolean
      breadcrumb?: string
    }
  }
  ```
