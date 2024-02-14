import { useAppSelector } from '../../../hooks'
import { selectNotifications } from '../../../store/infoSlice'
import Notification from './Notification'

const Notifications: React.FC = () => {
  const notifications = useAppSelector(selectNotifications)

  return (
    <div className='notifications'>
      {notifications.map((notification, index) => (
        <Notification key={notification.time} {...{ ...notification, index }} />
      ))}
    </div>
  )
}

export default Notifications
