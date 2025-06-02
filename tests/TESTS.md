# Tests Directory

Testing pyramid implementation.

## Layers:

| Directory | Tools                   | Coverage Target |
| --------- | ----------------------- | --------------- |
| `unit/`   | Vitest + Vue Test Utils | 80%+            |
| `e2e/`    | Playwright              | Critical paths  |

## Example Unit Test:

```ts
// tests/unit/Button.spec.ts
test('emits click event', async () => {
  const wrapper = mount(Button)
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toHaveLength(1)
})
```
