import type { StorageStrategy, InputData, StoredData } from '@/types/Storage'
import { LocalStorageManager } from '@/utils/LocalStorageManager'

/**
 * Implementation of StorageStrategy interface using browser's localStorage as persistence mechanism.
 * Manages data operations (load/save) for stored entries with automatic counter increment.
 */
class LocalStorageStrategy implements StorageStrategy {
  /**
   * Key used to store data in localStorage
   * @private
   */
  private KEY = 'storage'

  /**
   * Loads all stored data entries from localStorage
   * @returns {StoredData[]} Array of stored data objects. Returns empty array if no data exists.
   */
  load(): StoredData[] {
    const raw = LocalStorageManager.get(this.KEY, '')
    return raw ? JSON.parse(raw) : []
  }

  /**
   * Saves new data entry to localStorage with auto-incremented counter
   * @param {InputData} data - The input data to be stored (without counter)
   * @returns {StoredData} The newly created stored data object including generated counter
   */
  save(data: InputData): StoredData {
    const list = this.load()
    const last = list.at(-1)
    const counter = last ? last.Counter + 1 : 1

    const newEntry: StoredData = {
      ...data,
      Counter: counter,
    }

    const updatedList = [...list, newEntry]
    LocalStorageManager.set(this.KEY, JSON.stringify(updatedList))
    return newEntry
  }
}

// Export singleton instance of the LocalStorageStrategy
export default new LocalStorageStrategy()
