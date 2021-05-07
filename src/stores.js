import { writable } from 'svelte/store'

const blockCache = writable([])

const highest75percVal = writable(0)

export { blockCache, highest75percVal }
