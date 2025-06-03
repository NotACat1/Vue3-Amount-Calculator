<template>
  <div class="col-12 mt-5">
    <h1 class="mb-4">Order Form</h1>

    <form @submit.prevent="submitForm">
      <div class="row mb-3">
        <div class="col-md-3">
          <label for="price" class="form-label">Price:</label>
          <input
            id="price"
            v-model.number="formData.Price"
            type="number"
            class="form-control"
            step="0.01"
            min="0"
            required
            @input="calculateTotal"
          />
          <div class="form-text">Current Price: {{ formData.Price }}</div>
        </div>

        <div class="col-md-3">
          <label for="quantity" class="form-label">Quantity:</label>
          <input
            id="quantity"
            v-model.number="formData.Quantity"
            type="number"
            class="form-control"
            min="1"
            required
            @input="calculateTotal"
          />
          <div class="form-text">Current Quantity: {{ formData.Quantity }}</div>
        </div>

        <div class="col-md-3">
          <label for="total" class="form-label">Total:</label>
          <input
            id="total"
            v-model.number="formData.Total"
            type="number"
            class="form-control"
            readonly
          />
          <div class="form-text">Current Total: {{ formData.Total }}</div>
        </div>

        <button type="submit" class="btn btn-primary col-md-3" :disabled="isSubmitting">
          <span
            v-if="isSubmitting"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ isSubmitting ? 'Submitting...' : 'Submit Order' }}
        </button>
      </div>
    </form>

    <div class="mt-4 card">
      <div class="card-header">Form Data State</div>
      <div class="card-body">
        <pre>{{ formData }}</pre>
      </div>
    </div>

    <div class="mt-3 card">
      <div class="card-header">LocalStorage State</div>
      <div class="card-body">
        <pre>{{ localStorageState }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type InputData, type StoredData } from '@/types/Storage'
import { FakeApiService } from '@/services/FakeApiService'
import { Logger } from '@/utils/Logger'

/**
 * Reactive form data object containing price, quantity and total values
 * @type {import('vue').Ref<InputData>}
 */
const formData = ref<InputData>({
  Price: 0,
  Quantity: 1,
  Total: 0,
})

/**
 * Indicates if form is currently submitting
 * @type {import('vue').Ref<boolean>}
 */
const isSubmitting = ref(false)

/**
 * Status of the last form submission (success/error)
 * @type {import('vue').Ref<'success'|'error'|null>}
 */
const submitStatus = ref<'success' | 'error' | null>(null)

/**
 * Message to display after form submission
 * @type {import('vue').Ref<string>}
 */
const submitMessage = ref('')

/**
 * Array of stored data items from localStorage
 * @type {import('vue').Ref<StoredData[]>}
 */
const localStorageState = ref<StoredData[]>([])

/**
 * Calculates total price based on price and quantity
 * Updates the formData.total value
 */
const calculateTotal = () => {
  formData.value.Total = formData.value.Price * formData.value.Quantity
}

/**
 * Handles form submission
 * Sends data to API and updates local storage state
 * @async
 * @returns {Promise<void>}
 */
const submitForm = async () => {
  isSubmitting.value = true
  submitStatus.value = null
  submitMessage.value = ''

  try {
    Logger.log('info', 'Submitting request', formData.value)
    const response = await FakeApiService.save(formData.value)

    if (response.success && response.data) {
      submitStatus.value = 'success'
      submitMessage.value = response.message || 'Order submitted successfully!'
      Logger.log('info', submitMessage.value)
      await loadLocalStorageData()
    } else {
      submitStatus.value = 'error'
      submitMessage.value = response.message || 'Failed to submit order.'
      Logger.log('error', submitMessage.value)
    }
  } catch (error) {
    submitStatus.value = 'error'
    submitMessage.value = 'Failed to submit order. Please try again.'
    Logger.log('error', submitMessage.value, error)
  } finally {
    isSubmitting.value = false
  }
}

/**
 * Loads data from localStorage and updates the component state
 * @async
 * @returns {Promise<void>}
 */
const loadLocalStorageData = async () => {
  try {
    Logger.log('info', 'Loading data from localStorage')
    const response = await FakeApiService.load()

    if (response.success && response.data) {
      localStorageState.value = response.data
    }
    Logger.log('info', 'Data loaded', response.data)
  } catch (error) {
    Logger.log('error', 'Error loading data', error)
  }
}

// Initialize component - load data and set form values
onMounted(async () => {
  await loadLocalStorageData()
  // Initialize form with last saved data if available
  if (localStorageState.value.length > 0) {
    const lastItem = localStorageState.value[localStorageState.value.length - 1]
    formData.value = {
      Price: lastItem?.Price || 0,
      Quantity: lastItem?.Quantity || 1,
      Total: lastItem?.Total || 0,
    }
    calculateTotal()
  }
})
</script>

<style scoped>
.form-text {
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #6c757d;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.alert {
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
}
</style>
