import { defineConfig, loadEnv, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode, command }): UserConfig => {
  // Загрузка переменных окружения
  const env = loadEnv(mode, process.cwd(), '')

  // Проверка, находится ли в режиме разработки
  const isDev = command === 'serve'

  return {
    // Базовый путь для продакшена
    base: env.VITE_BASE_URL || '/',

    plugins: [
      vue(),
      tsconfigPaths(),
      // Генерация HTML с возможностью вставки переменных
      createHtmlPlugin({
        minify: !isDev,
        inject: {
          data: {
            title: env.VITE_APP_TITLE || 'Vue App',
            description: env.VITE_APP_DESCRIPTION || 'Vue Application',
          },
        },
      }),
      // PWA поддержка (опционально)
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: env.VITE_APP_TITLE || 'Vue App',
          short_name: 'VueApp',
          description: env.VITE_APP_DESCRIPTION || 'Vue Application',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        },
        devOptions: {
          enabled: false, // Отключить PWA в dev режиме
        },
      }),
      // Визуализатор бандла (только для продакшена)
      !isDev &&
        visualizer({
          filename: './dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    // Настройки разрешения модулей
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
    },

    // Настройки сервера разработки
    server: {
      port: parseInt(env.VITE_PORT || '3000'),
      host: true, // Доступ с других устройств в локальной сети
      open: true, // Автоматически открывать браузер
      proxy: {
        // Пример прокси для API
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },

    // Оптимизации для сборки
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: isDev,
      minify: isDev ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev, // Удалять console.log в продакшене
          drop_debugger: !isDev,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: id => {
            // Разделение vendor чанков
            if (id.includes('node_modules')) {
              if (id.includes('vue')) {
                return 'vue'
              }
              if (id.includes('lodash')) {
                return 'lodash'
              }
              return 'vendor'
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Лимит предупреждения о размере чанка (в KB)
    },
  }
})
