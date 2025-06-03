import { LocalStorageManager } from '@/utils/LocalStorageManager'
import { type LogEntry, type LogLevel } from '@/types/Logger'

/**
 * A static logger class that maintains application logs in memory
 * and persists them to localStorage. Provides methods for logging,
 * retrieving logs, and clearing logs.
 */
export class Logger {
  /** Key used to store logs in localStorage */
  private static readonly STORAGE_KEY = 'logs'

  /** Maximum number of logs to keep in memory */
  private static readonly MAX_LOGS = 100

  /** In-memory store of log entries */
  private static logs: LogEntry[] = Logger.loadLogs()

  /**
   * Adds a new log entry with the specified level, message, and optional context
   * @param level - The severity level of the log entry
   * @param message - Descriptive message for the log entry
   * @param context - Optional additional data to include with the log
   */
  public static log(level: LogLevel, message: string, context?: unknown): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context,
    }

    Logger.logs.push(entry)

    // Maintain log size limit
    if (Logger.logs.length > Logger.MAX_LOGS) {
      Logger.logs = Logger.logs.slice(-Logger.MAX_LOGS)
    }

    Logger.saveLogs()
  }

  /**
   * Retrieves all current log entries
   * @returns A copy of the current log entries array
   */
  public static getLogs(): LogEntry[] {
    return [...Logger.logs]
  }

  /**
   * Clears all logs from memory and removes them from localStorage
   */
  public static clear(): void {
    Logger.logs = []
    LocalStorageManager.remove(Logger.STORAGE_KEY)
  }

  /**
   * Saves current logs to localStorage after serializing them
   */
  private static saveLogs(): void {
    // Convert Date objects to ISO strings for serialization
    const serializableLogs = Logger.logs.map(log => ({
      ...log,
      timestamp: log.timestamp.toISOString(),
    }))
    LocalStorageManager.set(Logger.STORAGE_KEY, serializableLogs)
  }

  /**
   * Loads logs from localStorage and deserializes them
   * @returns Array of log entries with Date objects restored
   */
  private static loadLogs(): LogEntry[] {
    const raw = LocalStorageManager.get<Partial<LogEntry>[]>(Logger.STORAGE_KEY, [])

    if (!Array.isArray(raw)) {
      return []
    }

    // Convert ISO string timestamps back to Date objects
    return raw.map(entry => ({
      ...entry,
      timestamp: new Date(entry.timestamp ?? new Date()), // fallback to current date if undefined
    })) as LogEntry[]
  }
}
