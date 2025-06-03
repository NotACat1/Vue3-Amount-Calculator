/**
 * A utility class for managing localStorage operations with a namespaced prefix.
 * Provides methods for setting, getting, removing, and checking data in localStorage,
 * as well as clearing all application-specific data.
 * All keys are automatically prefixed to avoid collisions with other applications.
 */
export class LocalStorageManager {
  /**
   * The prefix used for all keys to namespace the application's localStorage data
   */
  private static readonly PREFIX = 'trading_calculator_'

  /**
   * Saves data to localStorage with automatic prefixing
   * @param {string} key - The key to save (will be automatically prefixed)
   * @param {T} value - The value to save (will be serialized to JSON)
   * @template T - The type of the value being stored
   */
  public static set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(`${this.PREFIX}${key}`, serializedValue)
    } catch (error) {
      console.error('LocalStorageManager: Error saving data', error)
    }
  }

  /**
   * Retrieves data from localStorage
   * @param {string} key - The key to retrieve (will be automatically prefixed)
   * @param {T | null} [defaultValue=null] - The default value to return if data is not found
   * @returns {T | null} The parsed data or defaultValue if not found
   * @template T - The expected type of the returned value
   */
  public static get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const serializedValue = localStorage.getItem(`${this.PREFIX}${key}`)
      if (serializedValue === null) return defaultValue
      return JSON.parse(serializedValue) as T
    } catch (error) {
      console.error('LocalStorageManager: Error reading data', error)
      return defaultValue
    }
  }

  /**
   * Removes data from localStorage
   * @param {string} key - The key to remove (will be automatically prefixed)
   */
  public static remove(key: string): void {
    localStorage.removeItem(`${this.PREFIX}${key}`)
  }

  /**
   * Clears all application-specific data from localStorage
   * (only removes keys that start with the configured prefix)
   */
  public static clearAll(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.PREFIX))
      .forEach(key => localStorage.removeItem(key))
  }

  /**
   * Checks if a key exists in localStorage
   * @param {string} key - The key to check (will be automatically prefixed)
   * @returns {boolean} True if the key exists, false otherwise
   */
  public static has(key: string): boolean {
    return localStorage.getItem(`${this.PREFIX}${key}`) !== null
  }
}
