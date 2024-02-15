import { WebSocketServer } from 'ws'
import { v4 as uuid } from 'uuid'
import { defaultMessages, defaultRoom, defaultUser, users } from './testData.js'

const PORT = 8888
const clients = {}

const serverData = {
  room: defaultRoom,
  messages: defaultMessages,
}

const server = new WebSocketServer({ port: PORT })

function onConnect(client) {
  const userId = uuid()
  clients[userId] = client
  console.log(`User ${userId} connected`)
  client.send(JSON.stringify({ type: 'room', data: serverData.room }))
  client.send(JSON.stringify({ type: 'messages', data: serverData.messages }))

  client.on('message', function (message) {
    try {
      const { action, data } = JSON.parse(message.toString())
      switch (action) {
        case 'MESSAGE':
          const newMessage = {
            author: `user-${userId.slice(-5)}`,
            data,
            time: Date.now(),
          }
          console.log('MESSAGE', {
            author: newMessage.author,
            time: newMessage.time,
          })
          serverData.messages.push(newMessage)
          for (const clientId in clients) {
            clients[clientId].send(JSON.stringify({ type: 'messages', data: [newMessage] }))
            if (clientId === userId) continue
            clients[clientId].send(JSON.stringify({ type: 'notification', data: newMessage }))
          }
          break
        case 'GET_USER':
          console.log('GET_USER', data)
          const userInfo = users.find(x => x.name === data) || {
            ...defaultUser,
            name: data,
          }
          client.send(JSON.stringify({ type: 'userInfo', data: userInfo }))
          
          break
        default:
          console.log('unknown action')
          break
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  })

  client.on('close', function () {
    delete clients[userId]
    console.log(`User ${userId} disconnected`)
  })
}

server.on('connection', onConnect)
console.log(`Server is running at http://localhost:${PORT}`)
