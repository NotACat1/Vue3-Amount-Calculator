# Composables Directory

Stateful logic containers using Composition API.

## Typical Examples:

- `useFetch.ts` - API client with abort controller
- `useBreakpoints.ts` - Reactive viewport detection
- `useFormValidation.ts` - Form handling with Zod

## Template:

```ts
export default function useFeature() {
  // State
  const state = ref();

  // Actions
  const action = () => { /*...*/ };

  // Computed
  const computedProp = computed(() => /*...*/ );

  return {
    state,
    action,
    computedProp
  };
}
```

## Rules:

✅ **Do**:

- Return plain objects (no ref unwrapping)
- Type all return values
- Document with JSDoc `@params` and `@returns`

❌ **Don't**:

- Modify DOM directly
- Depend on component instances
