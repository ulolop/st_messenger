import { IChatMessage } from '../../../../types'
import { useAppDispatch } from '../../../../hooks'
import { removeNotification } from '../../../../store/infoSlice'

interface INotification extends IChatMessage {
  index: number
}

const Notification: React.FC<INotification> = props => {
  const { author, data, time, index } = props
  const dispatch = useAppDispatch()

  const handleClose = () => dispatch(removeNotification(index))

  return (
    <div className="notification animate pop" onClick={handleClose}>
      <div className="chatMessage">
        <div className="content">
          <div className="title">
            <div>{author}</div>
            <div className="time">{new Date(time).toLocaleTimeString()}</div>
          </div>
          {data.type === 'message' && (
            <div>
              <div>{data.text.slice(0, 20) + (data.text.length > 20 ? '...' : '')}</div>
              {data.file && <div>[FILE]</div>}
            </div>
          )}
          {data.type === 'gif' && <div>[GIF]</div>}
        </div>
      </div>
    </div>
  )
}

export default Notification
