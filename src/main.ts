import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'

// Import global styles and libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/**
 * Creates and configures the Vue application instance.
 * @function
 * @name initializeApp
 * @returns {void}
 */
const app = createApp(App)

/**
 * Register plugins with the Vue application instance.
 * - Adds Vue Router for client-side navigation
 */
app.use(router)

/**
 * Mounts the Vue application to the DOM.
 * The application will be mounted to the element with id 'app' in the index.html file.
 */
app.mount('#app')
