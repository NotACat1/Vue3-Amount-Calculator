import { type ApiResponse } from '@/types/ApiResponse'
import { type InputData, type StoredData } from '@/types/Storage'
import LocalStorageStrategy from '@/stores/LocalStorageStrategy'

/**
 * Mock API service that simulates asynchronous data operations.
 * Provides methods to save and load data with artificial delays to mimic real API calls.
 */
export class FakeApiService {
  /**
   * Saves data to the mock storage after validation.
   * Only saves data if the 'Total' field is an even number (simulating validation logic).
   * @param {InputData} data - The input data to be saved
   * @returns {Promise<ApiResponse<StoredData>>} A promise that resolves to an API response object
   * @example
   * const response = await FakeApiService.save({ Total: 42, Description: 'Test' })
   */
  static async save(data: InputData): Promise<ApiResponse<StoredData>> {
    return new Promise(resolve => {
      setTimeout(() => {
        const isEven = data.Total % 2 === 0

        if (isEven) {
          const storedData = LocalStorageStrategy.save(data)

          resolve({
            success: true,
            message: 'Data saved successfully.',
            data: storedData,
            timestamp: Date.now(),
          })
        } else {
          resolve({
            success: false,
            message: 'Failed to save: Total is not even.',
            data: null,
            timestamp: Date.now(),
          })
        }
      }, 1000)
    })
  }

  /**
   * Loads all stored data from the mock storage.
   * @returns {Promise<ApiResponse<StoredData[]>>} A promise that resolves to an API response object containing all stored data
   * @example
   * const response = await FakeApiService.load()
   */
  static async load(): Promise<ApiResponse<StoredData[]>> {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = LocalStorageStrategy.load()

        resolve({
          success: true,
          message: 'Data loaded successfully.',
          data,
          timestamp: Date.now(),
        })
      }, 1000)
    })
  }
}
