import GifPicker, { TenorImage } from 'gif-picker-react'
import { useEffect, useRef, useState } from 'react'
import { IGifData } from '../../../../types'

interface IGifSelect {
  handleClickSendMessage: (message: IGifData) => void
}

const GifSelect: React.FC<IGifSelect> = props => {
  const { handleClickSendMessage } = props
  const gifContainerRef = useRef<HTMLElement>(null)
  const gifButtonRef = useRef<HTMLElement>(null)
  const [showGif, setShowGif] = useState(false)

  const handleGifSelected = (gif: TenorImage) => {
    setShowGif(false)
    handleClickSendMessage({
      type: 'gif',
      url: gif.url,
      description: gif.description,
      wigth: gif.width,
      height: gif.height,
    })
  }

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (
        showGif &&
        gifContainerRef.current &&
        !gifContainerRef.current.contains(event.target as Node) &&
        gifButtonRef.current &&
        !gifButtonRef.current.contains(event.target as Node)
      ) {
        setShowGif(false)
      }
    }
    document.addEventListener('mouseup', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mouseup', checkIfClickedOutside)
    }
  }, [showGif])

  return (
    <>
      <img
        ref={gifButtonRef as React.RefObject<HTMLImageElement>}
        className={showGif ? 'active' : ''}
        src="/icons/gif.svg"
        alt="GIF"
        width={22}
        onClick={() => setShowGif(!showGif)}
      />
      {showGif && (
        <div className="picker" ref={gifContainerRef as React.RefObject<HTMLDivElement>}>
          <GifPicker
            tenorApiKey="AIzaSyB-Z8lHuy_DzztpPdwkBi5MaHNfDIoNqNM"
            categoryHeight={64}
            onGifClick={handleGifSelected}
          />
        </div>
      )}
    </>
  )
}

export default GifSelect
