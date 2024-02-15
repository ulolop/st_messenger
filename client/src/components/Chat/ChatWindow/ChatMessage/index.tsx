import { useEffect, useRef } from 'react'
import { IChatMessage } from '../../../../types'

const IMG_WIDTH = 128

interface IMessage extends IChatMessage {
  handleUserSelected: (message: string) => void
  updateDate: (timestamp: number) => void
}

const ChatMessage: React.FC<IMessage> = props => {
  const { author, data, time, avatar, handleUserSelected, updateDate } = props
  const messageRef = useRef<HTMLElement>(null)

  const showUserInfo = () => handleUserSelected(author)

  const isImage = data.type === 'message' && data.file?.type?.match('image.*')

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0]
      if (entry.isIntersecting) updateDate(time)
    })
    if (messageRef.current) observer.observe(messageRef.current)
  }, [])

  return (
    <div className="chatMessage" ref={messageRef as React.RefObject<HTMLDivElement>}>
      <img className="avatar" src={`icons/${avatar || 'userIcon.svg'}`} alt={author} onClick={showUserInfo} />
      <div className="content">
        <div className="title">
          <div>{author}</div>
          <div className="time">{new Date(time).toLocaleTimeString()}</div>
        </div>
        {data.type === 'message' && (
          <div>
            <div>{data.text}</div>
            {data.file && (
              <div className="preview">
                {(isImage && <img src={data.file.name} alt={data.file.name} width={128} />) || (
                  <div>
                    <img src="icons/file.svg" alt="file" width={48} />
                    <div>{data.file.name}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {data.type === 'gif' && (
          <img
            src={data.url}
            alt={data.description}
            width={IMG_WIDTH}
            height={(data.height * IMG_WIDTH) / data.wigth}
          />
        )}
      </div>
    </div>
  )
}

export default ChatMessage
