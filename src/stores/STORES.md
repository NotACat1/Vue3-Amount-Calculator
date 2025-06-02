# Stores Directory

Global state management via Pinia.

## Store Structure:

```ts
// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
    preferences: defaultPreferences,
  }),

  getters: {
    isPremium: state => state.profile?.tier === 'premium',
  },

  actions: {
    async fetchProfile() {
      this.profile = await api.user.getProfile()
    },
  },
})
```

## Patterns:

- **Hydration**: Use `store.$hydrate()` for SSR
- **Subscriptions**: Persist state with `store.$subscribe`
- **Testing**: Mock stores with `createTestingPinia()`
