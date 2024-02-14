import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { clearUserInfo, selectUserInfo } from '../../../store/infoSlice'

const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(selectUserInfo)
  const { name, avatar, role, email, phone } = userInfo || {}
  const userInfoContainerRef = useRef<HTMLElement>(null)

  const handleClose = () => {
    dispatch(clearUserInfo())
  }

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (
        userInfo &&
        userInfoContainerRef.current &&
        !userInfoContainerRef.current.contains(event.target as Node)
      ) handleClose()
    }
    document.addEventListener('mouseup', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mouseup', checkIfClickedOutside)
    }
  }, [userInfo])

  return (
    <>
      {userInfo && (
        <div className="userInfoContainer" ref={userInfoContainerRef as React.RefObject<HTMLDivElement>}>
          <div className="userInfoHeader">
            <div className="title">Информация</div>
            <div className="actions">
              <img src="/icons/phone.svg" alt="Call" height={24} />
              <img src="/icons/close.svg" alt="Options" width={21} onClick={handleClose}/>
            </div>
          </div>
          <div className="userInfo">
            <div className="userMainData">
              <img className="avatar" src={`icons/${avatar || 'userIcon.svg'}`} alt={name} />
              <div>{name}</div>
              <div className="role">{role}</div>
            </div>
            <div className="userDetails">
              <div className="propname">Почта</div>
              <a href={`mailto:${email}`}>{email}</a>
              <hr />
              <div className="propname">Телефон</div>
              <div>{phone}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserInfo
