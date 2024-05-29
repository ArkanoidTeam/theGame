import { FC, FormEvent, useState, ChangeEvent } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { ButtonsContainer, StyledForm } from './styled'
import saveUserData from '../../api/saveUserData'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface IProfileProps {
  propUserData: User
  onDataChanged: () => void
  exitEditMode: () => void
  editMode: boolean
}

const ChangeDataForm: FC<IProfileProps> = ({
  propUserData,
  onDataChanged,
  editMode,
  exitEditMode,
}) => {
  const fields = {
    login: { label: 'Логин', placeholder: 'Логин', type: 'text' },
    email: { label: 'Почта', placeholder: 'Почта', type: 'email' },
    first_name: { label: 'Имя', placeholder: 'Имя', type: 'text' },
    second_name: { label: 'Фамилия', placeholder: 'Фамилия', type: 'text' },
    display_name: {
      label: 'Имя в чате',
      placeholder: 'Имя в чате',
      type: 'text',
    },
    phone: { label: 'Телефон', placeholder: '+7 (000) 000-00-00', type: 'tel' },
  }
  const [userData, setUserData] = useState({ ...propUserData })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      const { login, email, first_name, second_name, display_name, phone } =
        userData
      await saveUserData({
        login,
        email,
        first_name,
        second_name,
        display_name,
        phone,
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      exitEditMode()
      onDataChanged()
    }
  }
  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value = event.target.value
    const data = { ...userData }
    data[fieldName] = value
    setUserData({ ...data })
  }

  const onCancel = () => {
    setUserData({ ...propUserData })
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
            const fieldValue =
              userData[fieldName] === null ? '' : userData[fieldName]
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
export default ChangeDataForm
