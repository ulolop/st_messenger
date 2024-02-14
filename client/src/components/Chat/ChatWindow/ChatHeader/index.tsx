import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { selectRoom } from '../../../../store/chatSlice'
import { setUserInfo } from '../../../../store/infoSlice'

const ChatHeader: React.FC = () => {
  const { name, avatar, role, online } = useAppSelector(selectRoom)

  const dispatch = useAppDispatch()
  const showUserInfo = () => {
    dispatch(
      // TODO: get full user info
      setUserInfo({
        name: name,
        avatar: avatar,
        role: role,
        email: 'test@test.ru',
        phone: '8 (888) 888-88-88',
      }),
    )
  }

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
