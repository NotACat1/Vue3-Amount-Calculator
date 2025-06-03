/**
 * Represents a standardized API response structure.
 * @template T - The type of the data payload in the response.
 */
export interface ApiResponse<T> {
  /** Indicates whether the API request was successful */
  success: boolean
  /** Optional message describing the response (typically used for errors) */
  message?: string
  /** The payload data returned by the API (can be null) */
  data?: T | null
  /** Timestamp when the response was generated (in milliseconds since epoch) */
  timestamp?: number
}
