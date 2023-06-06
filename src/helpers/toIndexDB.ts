import { IMessageState } from 'types/types'

export function toIndexDB(state: IMessageState) {
  const indexDB = window.indexedDB.open('Messages')

  indexDB.onupgradeneeded = function (e) {
    const database = (e.target as IDBOpenDBRequest).result as IDBDatabase

    if (!database.objectStoreNames.contains('message')) {
      database.createObjectStore('message', { keyPath: 'id', autoIncrement: true })
    }
  }

  indexDB.onsuccess = async function (e) {
    const database = (e.target as IDBOpenDBRequest).result as IDBDatabase
    const transaction = database.transaction(['message'], 'readwrite')
    const objectStore = transaction.objectStore('message')

    objectStore.add(state)

    transaction.oncomplete = function () {
      database.close()
    }
  }
}
