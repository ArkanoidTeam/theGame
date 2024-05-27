import { FC, useState, ChangeEvent } from 'react'
import { StyledAvatar, VisuallyHiddenInput, StyledModalBody } from './styled'
import { Modal } from '../../../../components'
import { Button, Grid } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface IAvatarProps {
  userData: User
}
const ProfileAvatar: FC<IAvatarProps> = ({ userData }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleClickOpen = () => {
    setModalOpen(true)
  }

  const onClose = () => {
    setModalOpen(false)
  }

  const onAvatarSave = () => {
    console.log('saved')
    setModalOpen(false)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      // Проверка MIME-типа файла
      if (!file.type.startsWith('image/')) {
        setError('Выбран неверный тип файла')
        setSelectedImage(null)
        return
      }

      const reader = new FileReader()

      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setError(null)
      }

      reader.readAsDataURL(file)
    }
  }

  const userFullName = userData.first_name + ' ' + userData.second_name

  return (
    <>
      <StyledAvatar
        alt={userFullName}
        src={userData.avatar ? userData.avatar : ''}
        sx={{ width: 100, height: 100 }}
        onClick={handleClickOpen}
      />
      <Modal
        open={modalOpen}
        onClose={onClose}
        title="Модальное окно"
        content={
          <StyledModalBody>
            {(error || !selectedImage) && (
              <p style={{ color: 'red' }}>{error ? error : 'Файл не выбран'}</p>
            )}
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                style={{ maxWidth: '300px', marginTop: '20px' }}
              />
            )}
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}>
              Выбрать файл
              <VisuallyHiddenInput type="file" onInput={handleImageChange} />
            </Button>
          </StyledModalBody>
        }
        footerButtons={
          <Button
            variant="contained"
            disabled={!!error || !selectedImage}
            color="primary"
            onClick={onAvatarSave}>
            Сохранить
          </Button>
        }></Modal>
    </>
  )
}

export default ProfileAvatar
