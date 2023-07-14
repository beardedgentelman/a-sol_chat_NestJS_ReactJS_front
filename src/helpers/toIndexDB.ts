import Dexie from 'dexie'
import { IMessage } from 'types/types'

const messagesIndexedDb = new Dexie('Messages')
messagesIndexedDb.version(1).stores({
  messages: '++id, text, user, date'
})

const MAX_MESSAGES = 100

export const messagesTableIndexedDb = messagesIndexedDb.table<IMessage, number>('messages')

export async function addMessageToIndexDb(messageState: IMessage) {
  const messagesCount = await messagesTableIndexedDb.count()

  if (messagesCount >= MAX_MESSAGES) {
    const oldestMessage = await messagesTableIndexedDb.orderBy('date').first()
    if (oldestMessage) {
      await messagesTableIndexedDb.delete(Number(oldestMessage.id))
    }
  }

  await messagesTableIndexedDb.add(messageState)
}
