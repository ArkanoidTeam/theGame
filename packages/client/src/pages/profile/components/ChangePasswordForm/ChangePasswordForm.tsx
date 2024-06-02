import { FC, FormEvent, useState, ChangeEvent } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { ButtonsContainer, StyledForm } from './styled'
import savePasswordRequest from '../../api/savePasswordRequest'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { fields } from '.'

interface IProfileProps {
  exitEditMode: () => void
  editMode: boolean
}

const ChangePasswordForm: FC<IProfileProps> = ({ editMode, exitEditMode }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      await savePasswordRequest(oldPassword, newPassword)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      exitEditMode()
    }
  }
  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value = event.target.value
    switch (fieldName) {
      case 'oldPassword': {
        setOldPassword(() => value)
        break
      }
      case 'newPassword': {
        setNewPassword(() => value)
        break
      }
      case 'newPasswordAgain': {
        setNewPasswordAgain(() => value)
        break
      }
      default:
        undefined
    }
  }

  const getFieldValue = (fieldName: string) => {
    switch (fieldName) {
      case 'oldPassword': {
        return oldPassword
      }
      case 'newPassword': {
        return newPassword
      }
      case 'newPasswordAgain': {
        return newPasswordAgain
      }
      default:
        return ''
    }
  }

  const onCancel = () => {
    setOldPassword('')
    setNewPassword('')
    setNewPasswordAgain('')
    exitEditMode()
  }

  return (
    <StyledForm onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center">
        {loading && <LoadingSpinner />}
        {!loading &&
          Object.entries(fields).map(item => {
            const [fieldName, fieldProps] = item
            const disabled = !editMode
            const fieldValue = getFieldValue(fieldName)
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
                  value={fieldValue}
                  autoComplete={fieldProps.autocomplete}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    onChange(event, fieldName)
                  }
                />
              </Grid>
            )
          })}
      </Grid>
      {editMode && (
        <ButtonsContainer>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            onSubmit={onSubmit}>
            Сохранить
          </Button>
          <Button
            fullWidth
            variant="contained"
            type="button"
            color="error"
            onClick={onCancel}>
            Отменить
          </Button>
        </ButtonsContainer>
      )}
    </StyledForm>
  )
}
export default ChangePasswordForm
