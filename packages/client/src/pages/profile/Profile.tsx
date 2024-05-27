import { FC, useMemo, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import {
  ButtonsContainer,
  StyledContainer,
  StyledForm,
  StyledWrapper,
} from './styled'
import { Typography } from '../../components/Typography'
import { fields } from '.'
import { ProfileAvatar } from './components'

interface IProfileProps {
  propUserData: User
}

const Profile: FC<IProfileProps> = ({ propUserData }) => {
  const [userData, setUserData] = useState({ ...propUserData })
  const [userEditMode, setUserEditMode] = useState(false)
  const [passwordEditMode, setPasswordEditMode] = useState(false)

  const saveUserData = (event: Event) => {
    event.preventDefault()
    console.log('user data saved')
    setUserEditMode(false)
  }

  const saveUserPassord = (event: Event) => {
    event.preventDefault()
    console.log('user password saved')
    setPasswordEditMode(false)
  }

  const deleteAccount = () => {
    console.log('user account deleted')
  }

  const cancelEdits = () => {
    setUserData({ ...propUserData })
    setUserEditMode(false)
    setPasswordEditMode(false)
  }

  const currentFields = useMemo(() => {
    if (passwordEditMode) {
      const { old_password, new_password, new_password_again } = fields
      return { old_password, new_password, new_password_again }
    }

    const { login, email, first_name, second_name, display_name, phone } =
      fields
    return { login, email, first_name, second_name, display_name, phone }
  }, [passwordEditMode])

  const currentButtons = useMemo(() => {
    const cancelButton = {
      buttonText: 'Отменить',
      color: 'primary',
      type: 'reset',
      onClick: cancelEdits,
    }

    if (userEditMode) {
      return {
        buttonSave: {
          buttonText: 'Сохранить данные',
          color: 'primary',
          type: 'submit',
          onClick: saveUserData,
        },
        cancelButton,
      }
    }

    if (passwordEditMode) {
      return {
        buttonSave: {
          buttonText: 'Сохранить пароль',
          color: 'primary',
          type: 'submit',
          onClick: saveUserPassord,
        },
        cancelButton,
      }
    }

    return {
      changeData: {
        buttonText: 'Изменить данные',
        color: 'primary',
        type: 'button',
        onClick: () => setUserEditMode(true),
      },
      changePassword: {
        buttonText: 'Изменить пароль',
        color: 'primary',
        type: 'button',
        onClick: () => setPasswordEditMode(true),
      },
      deleteAccount: {
        buttonText: 'Удалить аккаунт',
        type: 'button',
        color: 'error',
        onClick: () => deleteAccount(),
      },
    }
  }, [userEditMode, passwordEditMode])

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledWrapper>
        <Typography component="h1" variant="h2" context="Arkanoid" />
        <Typography component="h3" variant="h3" context="Аккаунт" />
        <ProfileAvatar userData={userData} />
        <StyledForm>
          <Grid container spacing={3} justifyContent="center">
            {Object.entries(currentFields).map(item => {
              const [fieldName, fieldProps] = item
              const value = userData[fieldName]
              const disabled = userEditMode || passwordEditMode ? false : true
              return (
                <Grid item xs={8} key={fieldName}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id={fieldName}
                    label={fieldProps.label}
                    name={fieldName}
                    placeholder={fieldProps.placeholder}
                    type={fieldProps.type}
                    disabled={disabled}
                    value={passwordEditMode ? undefined : value}
                  />
                </Grid>
              )
            })}
          </Grid>
          <ButtonsContainer>
            {Object.entries(currentButtons).map(item => {
              const [buttonName, buttonProps] = item
              return (
                <Button
                  key={buttonName}
                  fullWidth
                  variant="contained"
                  type={buttonProps.type}
                  color={buttonProps.color}
                  onClick={buttonProps.onClick}>
                  {buttonProps.buttonText}
                </Button>
              )
            })}
          </ButtonsContainer>
        </StyledForm>
      </StyledWrapper>
    </StyledContainer>
  )
}

export default Profile
