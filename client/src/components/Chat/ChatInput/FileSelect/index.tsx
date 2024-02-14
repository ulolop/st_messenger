import { useRef } from 'react'

interface IFileSelect {
  selectedFile: File | null
  setSelectedFile: (file: File | null) => void
  chatInputRef: React.RefObject<HTMLElement>
}

const FileSelect: React.FC<IFileSelect> = props => {
  const { selectedFile, setSelectedFile, chatInputRef } = props
  const fileInputRef = useRef<HTMLElement>(null)
  const fileButtonRef = useRef<HTMLElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedFile(e.target.files[0])
    chatInputRef.current?.focus()
  }

  const isImage = selectedFile?.type.match('image.*')
  const handleClear = () => setSelectedFile(null)

  return (
    <>
      {selectedFile && (
        <div className="picker">
          <div className="preview">
            {isImage && (
              <img src={selectedFile === null ? '' : URL.createObjectURL(selectedFile)} alt="preview" width={128} />
            )}
            {!isImage && <img src="icons/file.svg" alt="file" width={48} />}
            <div>{selectedFile.name}</div>
          </div>
          <div className="clear">
            <img src="/icons/close.svg" alt="Options" width={21} onClick={handleClear} />
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef as React.RefObject<HTMLInputElement>}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <img
        ref={fileButtonRef as React.RefObject<HTMLImageElement>}
        src="/icons/attachment.svg"
        alt="File"
        height={21.5}
        onClick={handleUploadClick}
      />
    </>
  )
}

export default FileSelect
