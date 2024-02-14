import { useAppDispatch } from '../../../../hooks'
import { setUserInfo } from '../../../../store/infoSlice'
import { IChatMessage } from '../../../../types'

const IMG_WIDTH = 128

const ChatMessage: React.FC<IChatMessage> = props => {
  const { author, data, time, avatar } = props

  const dispatch = useAppDispatch()
  const showUserInfo = () => {
    dispatch(
      // TODO: get full user info
      setUserInfo({
        name: author,
        avatar: avatar,
        role: 'менеджер',
        email: 'test@test.ru',
        phone: '8 (888) 888-88-88',
      }),
    )
  }

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
