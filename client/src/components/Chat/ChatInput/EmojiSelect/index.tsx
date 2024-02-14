import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'

interface IEmojiSelect {
  updateValue: (str: string) => void
}

const EmojiSelect: React.FC<IEmojiSelect> = props => {
  const { updateValue } = props
  const emojiContainerRef = useRef<HTMLElement>(null)
  const emojiButtonRef = useRef<HTMLElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleEmojiSelected = (emoji: EmojiClickData) => {
    updateValue(emoji.emoji)
  }

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiContainerRef.current &&
        !emojiContainerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mouseup', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mouseup', checkIfClickedOutside)
    }
  }, [showEmojiPicker])

  return (
    <>
      <img
        ref={emojiButtonRef as React.RefObject<HTMLImageElement>}
        className={showEmojiPicker ? 'active' : ''}
        src="/icons/emoji.svg"
        alt="Emoji"
        width={24}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />
      {showEmojiPicker && (
        <div className="picker" ref={emojiContainerRef as React.RefObject<HTMLDivElement>}>
          <EmojiPicker skinTonesDisabled={true} onEmojiClick={handleEmojiSelected} />
        </div>
      )}
    </>
  )
}

export default EmojiSelect
