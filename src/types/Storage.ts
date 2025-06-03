/**
 * Represents input data structure for financial transactions.
 */
export interface InputData {
  /** The unit price of the item */
  Price: number
  /** The quantity of items */
  Quantity: number
  /** The calculated total amount (price × quantity) */
  Total: number
}

/**
 * Extends InputData with storage-specific properties.
 * Represents how data is stored in the system.
 */
export interface StoredData extends InputData {
  /** Auto-incremented counter for tracking entries */
  Counter: number
}

/**
 * Defines the contract for data storage strategies.
 */
export interface StorageStrategy {
  /**
   * Loads all stored data entries.
   * @returns An array of StoredData objects
   */
  load(): StoredData[]

  /**
   * Saves input data to storage.
   * @param data - The InputData to be saved
   * @returns The stored data including generated fields
   */
  save(data: InputData): StoredData
}
