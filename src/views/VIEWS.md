# Views Directory

Route-level components that represent full pages in your application.

## Key Principles:

- **1 View = 1 Route**  
  Each Vue component here maps directly to a route in `router/index.ts`
- **Layout Handling**  
  Views delegate layout structure to `components/layout/`

## Structure:

```
views/
├── auth/
│   ├── LoginView.vue       # /login
│   └── RegisterView.vue    # /register
├── dashboard/
│   ├── AnalyticsView.vue   # /dashboard/analytics
│   └── SettingsView.vue
└── HomeView.vue            # /
```

## Best Practices:

1. **Data Fetching**  
   Use route guards or `onMounted` for initial data:
   ```ts
   // In setup()
   const { data } = await useFetch('/api/posts')
   ```
2. **Lazy Loading**  
   Configure in router:

   ```ts
   {
     path: '/about',
     component: () => import('@/views/AboutView.vue')
   }
   ```

3. **Naming Convention**
   - Suffix with `View` (e.g., `ProductView.vue`)
   - Group related views in subfolders (e.g., `settings/`)

> ⚠️ **Avoid**:
>
> - Complex business logic (move to `composables/` or `services/`)
> - Direct store mutations (use actions instead)
