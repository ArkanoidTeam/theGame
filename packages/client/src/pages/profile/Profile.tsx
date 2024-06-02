import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { ButtonsContainer } from './styled'
import { Typography } from '../../components/Typography'
import { ProfileAvatar } from './components'
import { ChangeDataForm } from './components'
import { ChangePasswordForm } from './components'
import PageTemplate from '../../components/PageTemplate/PageTemplate'

interface IProfileProps {
  propUserData: User
  onDataChanged: () => void
}

const Profile: FC<IProfileProps> = ({ propUserData, onDataChanged }) => {
  const [userEditMode, setUserEditMode] = useState(false)
  const [passwordEditMode, setPasswordEditMode] = useState(false)
  const navigate = useNavigate()

  const onDeleteAccount = () => {
    console.log('user account deleted')
  }

  return (
    <PageTemplate pageTitle="Аккаунт">
      <ProfileAvatar
        propUserData={propUserData}
        onDataChanged={onDataChanged}
      />
      {!passwordEditMode && (
        <ChangeDataForm
          propUserData={propUserData}
          onDataChanged={onDataChanged}
          exitEditMode={() => setUserEditMode(false)}
          editMode={userEditMode}
        />
      )}
      {passwordEditMode && (
        <ChangePasswordForm
          exitEditMode={() => setPasswordEditMode(false)}
          editMode={passwordEditMode}
        />
      )}
      {!userEditMode && !passwordEditMode && (
        <ButtonsContainer>
          <Button
            fullWidth
            variant="contained"
            type="button"
            color="primary"
            onClick={() => setUserEditMode(true)}>
            Изменить данные
          </Button>
          <Button
            fullWidth
            variant="contained"
            type="button"
            color="primary"
            onClick={() => setPasswordEditMode(true)}>
            Изменить пароль
          </Button>
          <Button
            fullWidth
            variant="contained"
            type="button"
            color="error"
            onClick={() => onDeleteAccount()}>
            Удалить аккаунт
          </Button>
        </ButtonsContainer>
      )}
    </PageTemplate>
  )
}

export default Profile
