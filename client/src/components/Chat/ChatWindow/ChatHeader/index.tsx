import { useAppSelector } from '../../../../hooks'
import { selectRoom } from '../../../../store/chatSlice'

interface IChatHeader {
  handleUserSelected: (message: string) => void
}

const ChatHeader: React.FC<IChatHeader> = props => {
  const { handleUserSelected } = props
  const { name, avatar, role, online } = useAppSelector(selectRoom)

  const showUserInfo = () => handleUserSelected(name)

  return (
    <div className="chatHeader">
      <div className="avatarContainer" onClick={showUserInfo} >
        <img className="avatar" src={`icons/${avatar || 'userIcon.svg'}`} alt={name} />
        {online && <div className="isOnline animate pop" />}
      </div>
      <div className="user">
        <div onClick={showUserInfo} style={{width: 'max-content'}} >
          <div>{name}</div>
          <div className="role">{role}</div>
        </div>
      </div>
      <div className="actions">
        <img src="/icons/phone.svg" alt="Call" height={24} />
        <img src="/icons/options.svg" alt="Options" width={24} onClick={showUserInfo} />
      </div>
    </div>
  )
}

export default ChatHeader
