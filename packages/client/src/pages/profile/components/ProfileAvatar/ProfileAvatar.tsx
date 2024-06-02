import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { StyledAvatar, VisuallyHiddenInput, StyledModalBody } from './styled'
import { Modal } from '../../../../components'
import { Button, CircularProgress, Box } from '@mui/material'
import { green } from '@mui/material/colors'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import saveAvatarRequest from '../../api/saveAvatarRequest'

const RESOURCES_LINK = `https://ya-praktikum.tech/api/v2/resources`

interface IAvatarProps {
  propUserData: User
  onDataChanged: () => void
}
const ProfileAvatar: FC<IAvatarProps> = ({ propUserData, onDataChanged }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  }

  const handleClickOpen = () => {
    setModalOpen(true)
  }

  const onClose = () => {
    setModalOpen(false)
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    if (file) {
      const data = new FormData()
      data.append('avatar', file)
      try {
        await saveAvatarRequest(data)
        setSuccess(true)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
        onDataChanged()
        setModalOpen(false)
      }
    }
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

      // Проверка размера файла (например, лимит 5MB)
      const maxSizeInMB = 1
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024

      if (file.size > maxSizeInBytes) {
        setError(`Размер файла превышает допустимый лимит в ${maxSizeInMB}MB`)
        setSelectedImage(null)
        return
      }

      setFile(file)

      const reader = new FileReader()

      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setError(null)
      }

      reader.readAsDataURL(file)
    }
  }

  const userFullName = propUserData.first_name + ' ' + propUserData.second_name

  return (
    <>
      <StyledAvatar
        alt={userFullName}
        src={propUserData.avatar ? RESOURCES_LINK + propUserData.avatar : ''}
        sx={{ width: 100, height: 100 }}
        onClick={handleClickOpen}
      />
      <Modal
        open={modalOpen}
        onClose={onClose}
        title="Модальное окно"
        footerButtons={
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant="contained"
              sx={buttonSx}
              disabled={!!error || !selectedImage || loading}
              color="primary"
              onClick={onSubmit}>
              Сохранить
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        }>
        <StyledModalBody onSubmit={onSubmit}>
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
      </Modal>
    </>
  )
}

export default ProfileAvatar
