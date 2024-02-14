import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../hooks'
import { selectMessages } from '../../../store/chatSlice'
import { formatDate } from '../../../utils'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'

interface IChatWindow {
  handleUserSelected: (message: string) => void
}

const ChatWindow: React.FC<IChatWindow> = props => {
  const { handleUserSelected } = props
  const messages = useAppSelector(selectMessages)
  const [date, setDate] = useState(formatDate(messages[messages.length - 1]?.time || Date.now()))
  const [dateUpdated, setDateUpdated] = useState(false)
  const updateDate = (timestamp: number) => setDate(formatDate(timestamp))

  const messagesEndRef = useRef<HTMLElement>(null)
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setDateUpdated(false)
    setTimeout(() => setDateUpdated(true), 0)
  }, [date])

  return (
    <>
      <img className="chatLogo" src="icons/logo_horizontal.svg" alt="St Messenger" />
      <div className="chatContainer">
        <ChatHeader handleUserSelected={handleUserSelected} />
        <div className="chatWindow scroller">
          <div className={`chatDate ${dateUpdated ? 'animate fade' : ''}`}>{date}</div>
          {messages.map((message, index) => (
            <ChatMessage key={index} {...{ ...message, handleUserSelected, updateDate }} />
          ))}
          <div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
        </div>
      </div>
    </>
  )
}

export default ChatWindow
