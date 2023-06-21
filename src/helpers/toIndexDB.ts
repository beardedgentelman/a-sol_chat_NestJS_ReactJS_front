import Dexie from 'dexie'
import { IMessage } from 'types/types'

const messagesIndexedDb = new Dexie('Messages')
messagesIndexedDb.version(1).stores({
  messages: '++id, text, user, date'
})

export const messagesTableIndexedDb = messagesIndexedDb.table<IMessage, number>('messages')

export async function addMessageToIndexDb(messageState: IMessage) {
  await messagesTableIndexedDb.add(messageState)
}
