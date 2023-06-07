import Dexie from 'dexie'
import { IMessageState } from 'types/types'

const messagesIndexedDb = new Dexie('Messages')
messagesIndexedDb.version(1).stores({
  messages: '++id, text, user, date'
})

export const messagesTableIndexedDb = messagesIndexedDb.table<IMessageState, number>('messages')

export async function addMessageToIndexDb(messageState: IMessageState) {
  await messagesTableIndexedDb.add(messageState)
}
