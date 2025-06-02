import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// Конфигурация Vue Test Utils
config.global.plugins = [createPinia()]

// Настройки перед каждым тестом
beforeEach(() => {
  setActivePinia(createPinia())
})

// Очистка после каждого теста
afterEach(() => {
  vi.clearAllMocks()
})

// Полифиллы при необходимости
if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: vi.fn(),
  })
}
