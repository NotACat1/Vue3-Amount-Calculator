# Components Directory

Reusable Vue components following Atomic Design principles.

## Structure:

```
components/
├── ui/           # Atoms & Molecules
│   ├── Button/
│   │   ├── Button.vue
│   │   ├── Button.stories.js
│   │   └── index.ts      # Barrel export
├── layout/       # Organisms
│   ├── AppHeader.vue
│   └── AppFooter.vue
└── shared/       # Project-specific composites
```

## Conventions:

1. **Props**: Strictly typed with `defineProps<T>()` + runtime validation
   ```ts
   interface Props {
     variant?: 'primary' | 'outline'
     loading?: boolean
   }
   ```
2. **Slots**: Use `useSlots()` for dynamic slot checks
3. **Styling**: CSS Modules (`<style module>`) for local scope
4. **Testing**: Co-located `*.spec.ts` files with 80%+ coverage

> 📌 **Naming Rules**:
>
> - Prefix context-specific components (`CartProductCard.vue`)
> - Suffix HOCs with `*.provider.vue`
