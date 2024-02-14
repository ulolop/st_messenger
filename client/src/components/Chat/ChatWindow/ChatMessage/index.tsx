import { IChatMessage } from '../../../../types'

const IMG_WIDTH = 128

interface IMessage extends IChatMessage {
  handleUserSelected: (message: string) => void
}

const ChatMessage: React.FC<IMessage> = props => {
  const { author, data, time, avatar, handleUserSelected } = props

  const showUserInfo = () => handleUserSelected(author)

  return (
    <div className="chatMessage">
      <img className="avatar" src={`icons/${avatar || 'userIcon.svg'}`} alt={author} onClick={showUserInfo} />
      <div className="content">
        <div className="title">
          <div>{author}</div>
          <div className="time">{new Date(time).toLocaleTimeString()}</div>
        </div>
        {data.type === 'message' && (
          <div>
            <div>{data.text}</div>
            {/* TODO: display file */}
            {data.file && <div>{JSON.stringify(data.file)}</div>}
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
