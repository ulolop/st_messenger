import { useRef, useState } from 'react'
import FileSelect from './FileSelect'
import EmojiSelect from './EmojiSelect'
import GifSelect from './GifSelect'
import { IGifData, IMessageData } from '../../../types'

interface IChatInput {
  handleClickSendMessage: (message: IMessageData | IGifData) => void
}

const ChatInput: React.FC<IChatInput> = props => {
  const { handleClickSendMessage } = props
  const [value, setValue] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const chatInputRef = useRef<HTMLElement>(null)

  const updateValue = (str: string) => {
    setValue(prevInput => prevInput + str)
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!value && !selectedFile) return
    const newMessage: IMessageData = {
      type: 'message',
      text: value,
    }
    if (selectedFile) newMessage.file = selectedFile
    handleClickSendMessage(newMessage)
    setValue('')
    setSelectedFile(null)
  }

  return (
    <form className="chatInput" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Введите текст.."
        value={value}
        onChange={onChange}
        ref={chatInputRef as React.RefObject<HTMLInputElement>}
      />
      <div className="attach">
        <FileSelect {...{ selectedFile, setSelectedFile, chatInputRef }} />
        <EmojiSelect updateValue={updateValue} />
        <GifSelect handleClickSendMessage={handleClickSendMessage} />
      </div>
      <button type="submit">
        <img src="/icons/arrow.svg" alt="Send message" width={20} />
      </button>
    </form>
  )
}

export default ChatInput
