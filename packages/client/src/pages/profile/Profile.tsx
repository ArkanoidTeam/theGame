import { FC, useState } from 'react'
import { Button } from '@mui/material'
import { ButtonsContainer } from './styled'
import { ProfileAvatar } from './components'
import { ChangeDataForm } from './components'
import { ChangePasswordForm } from './components'
import { Footer, Header, Page, PageContent } from '../../components'

interface IProfileProps {
  propUserData: User
  onDataChanged: () => void
}

const Profile: FC<IProfileProps> = ({ propUserData, onDataChanged }) => {
  const [userEditMode, setUserEditMode] = useState(false)
  const [passwordEditMode, setPasswordEditMode] = useState(false)

  const onDeleteAccount = () => {
    console.log('user account deleted')
  }

  return (
    <Page>
      <Header />
      <PageContent title="Arkanoid" subtitle="Аккаунт">
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
      </PageContent>
      <Footer />
    </Page>
  )
}

export default Profile
