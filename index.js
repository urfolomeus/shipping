//@ts-check

/** @typedef { import('./types.d').StorageItem} StorageItem */
/** @typedef { import('./types.d').ShipStorage} ShipStorage */

/** @type ShipStorage */
const storage = {
  max: undefined,
  items: []
}

Object.defineProperty(storage, 'max', { writable: false, value: 5000})

let currentStorage = undefined

function storageUsed() {
  if(currentStorage) {
    return currentStorage
  }
  currentStorage = 0
  for(let i = 0; i < storage.items.length; i++) {
    currentStorage += storage.items[i].weight
  }
  return currentStorage
}

/**
 * @param {StorageItem} item
 */
function add(item) {
  if(storage.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }
  if(isDevelopment) {
    const itemCount = storage.items.length
    console.log(`${itemCount} items`)
    console.log(`${currentStorage} kg total`)
  }
}
