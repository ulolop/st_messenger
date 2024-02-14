// import { useState } from 'react'
import { useEffect, useRef } from 'react'
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
  const date = formatDate(messages[messages.length - 1]?.time || Date.now())
  // TODO: update the date onscroll
  // const [date, setDate] = useState(formatDate(messages[messages.length-1].time || 0))
  
  const messagesEndRef = useRef<HTMLElement>(null)
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <img className="chatLogo" src="icons/logo_horizontal.svg" alt="St Messenger" />
      <div className="chatContainer">
        <ChatHeader />
        <div className="chatWindow scroller">
          <div className="chatDate">{date}</div>
          {messages.map((message, index) => (
            <ChatMessage key={index} {...{...message, handleUserSelected}} />
          ))}
          <div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
        </div>
      </div>
    </>
  )
}

export default ChatWindow
