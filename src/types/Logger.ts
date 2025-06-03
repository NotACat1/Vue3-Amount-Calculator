/**
 * Defines the available log levels for application logging.
 */
export type LogLevel = 'info' | 'warn' | 'error'

/**
 * Represents a single log entry in the application's logging system.
 */
export interface LogEntry {
  /** The date and time when the log entry was created */
  timestamp: Date
  /** The severity level of the log entry */
  level: LogLevel
  /** The log message content */
  message: string
  /** Optional additional context data related to the log entry */
  context?: unknown
}
