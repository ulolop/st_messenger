import { useState, useEffect, useCallback } from 'react'
import useWebSocket from 'react-use-websocket'
import ChatInput from './ChatInput'
import ChatWindow from './ChatWindow'
import UserInfo from './UserInfo'
import { IChatMessage, IChatRoom, IChatServerData, IGifData, IMessageData } from '../../types'
import { useAppDispatch } from '../../hooks'
import { setMessages, updateRoom } from '../../store/chatSlice'
import { useSound } from 'use-sound'

const WS_URL = 'ws://localhost'
const WS_PORT = 8888

const Chat: React.FC = () => {
  const dispatch = useAppDispatch()
  const [roomData, setRoomData] = useState<IChatRoom | null>(null)
  const [messageHistory, setMessageHistory] = useState<IChatMessage[]>([])
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(`${WS_URL}:${WS_PORT}`)
  const [playSound] = useSound('pop.mp3', { interrupt: true })

  useEffect(() => {
    if (lastJsonMessage === null) return
    const { type, data } = lastJsonMessage as IChatServerData
    if (type === 'room') setRoomData(data as IChatRoom)
    if (type === 'messages') setMessageHistory(prev => prev.concat(data as IChatMessage[]))
  }, [lastJsonMessage])

  useEffect(() => {
    if (roomData) dispatch(updateRoom(roomData))
  }, [roomData])

  useEffect(() => {
    dispatch(setMessages(messageHistory))
    playSound()
  }, [messageHistory])

  const handleClickSendMessage = useCallback((message: IMessageData | IGifData) => {
    sendJsonMessage({ action: 'MESSAGE', data: message })
  }, [])

  return (
    <>
      <ChatWindow />
      <ChatInput handleClickSendMessage={handleClickSendMessage} />
      <UserInfo />
    </>
  )
}

export default Chat
