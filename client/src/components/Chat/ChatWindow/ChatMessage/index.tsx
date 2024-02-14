import { IChatMessage } from '../../../../types'

const IMG_WIDTH = 128

interface IMessage extends IChatMessage {
  handleUserSelected: (message: string) => void
}

const ChatMessage: React.FC<IMessage> = props => {
  const { author, data, time, avatar, handleUserSelected } = props

  const showUserInfo = () => handleUserSelected(author)

  // TODO: get image
  const isImage = data.type === 'message' && data.file?.type?.match('image.*')

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
            {data.file && (
              <div className="preview">
                {(isImage && <img src={data.file.name} alt="preview" width={128} />) || (
                  <img src="icons/file.svg" alt="file" width={48} />
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
