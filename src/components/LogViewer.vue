<template>
  <div class="card col-12 mt-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h2 class="mb-0">System Logs</h2>
      <button class="btn btn-sm btn-danger" @click="clearLogs">Clear</button>
    </div>

    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-4">
          <select v-model="filterLevel" class="form-select">
            <option value="">All levels</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </div>
        <div class="col-md-8">
          <input
            v-model="searchTerm"
            type="text"
            class="form-control"
            placeholder="Search by message..."
          />
        </div>
      </div>

      <ul class="list-group log-list">
        <li v-for="(log, index) in filteredLogs" :key="index" class="list-group-item">
          <div class="d-flex justify-content-between">
            <div>
              <span class="badge bg-secondary me-2">{{ formatDate(log.timestamp) }}</span>
              <span :class="levelClass(log.level)" class="me-2">{{ log.level.toUpperCase() }}</span>
              {{ log.message }}
            </div>
          </div>
          <pre v-if="log.context" class="small text-muted mt-2 mb-0">{{
            formatContext(log.context)
          }}</pre>
        </li>
        <li v-if="filteredLogs.length === 0" class="list-group-item text-muted">
          No logs matching the criteria.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Logger } from '@/utils/Logger'
import { type LogEntry, type LogLevel } from '@/types/Logger'

/**
 * Reactive array of log entries
 * @type {import('vue').Ref<LogEntry[]>}
 */
const logs = ref<LogEntry[]>([])

/**
 * Current filter level (empty string means all levels)
 * @type {import('vue').Ref<string>}
 */
const filterLevel = ref<string>('')

/**
 * Current search term for filtering logs
 * @type {import('vue').Ref<string>}
 */
const searchTerm = ref<string>('')

/**
 * Updates the logs array with the latest logs from the Logger utility
 * Logs are reversed to show newest first
 */
const updateLogs = () => {
  logs.value = Logger.getLogs().slice().reverse()
}

/**
 * Clears all logs using the Logger utility and updates the local logs array
 */
const clearLogs = () => {
  Logger.clear()
  updateLogs()
}

/**
 * Formats a date to a localized string
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleString()
}

/**
 * Formats log context object to a pretty-printed JSON string
 * Falls back to simple string conversion if JSON.stringify fails
 * @param {unknown} context - The log context to format
 * @returns {string} Formatted context string
 */
const formatContext = (context: unknown): string => {
  try {
    return JSON.stringify(context, null, 2)
  } catch {
    return String(context)
  }
}

/**
 * Returns appropriate CSS class for a given log level
 * @param {LogLevel} level - The log level
 * @returns {string} Bootstrap badge class for the level
 */
const levelClass = (level: LogLevel): string => {
  switch (level) {
    case 'info':
      return 'badge bg-info'
    case 'warn':
      return 'badge bg-warning text-dark'
    case 'error':
      return 'badge bg-danger'
    default:
      return 'badge bg-secondary'
  }
}

/**
 * Computed property that filters logs based on current level filter and search term
 * @type {import('vue').ComputedRef<LogEntry[]>}
 */
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    // Filter by level
    const levelMatch = !filterLevel.value || log.level === filterLevel.value

    // Filter by search term (checks both message and stringified context)
    const searchMatch =
      !searchTerm.value ||
      log.message.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      (log.context &&
        JSON.stringify(log.context).toLowerCase().includes(searchTerm.value.toLowerCase()))

    return levelMatch && searchMatch
  })
})

// Auto-update logs
let intervalId: number
onMounted(() => {
  updateLogs()
  intervalId = window.setInterval(updateLogs, 1000)
})
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.log-list {
  max-height: 500px;
  overflow-y: auto;
  font-family: monospace;
}

.badge {
  font-size: 0.8em;
  font-weight: normal;
}

.list-group-item {
  padding: 0.75rem 1.25rem;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: 0;
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
</style>
