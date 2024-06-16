import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import { ButtonsContainer, StyledForm, StyledError } from './styled'
import saveUserData from '../../api/saveUserData'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import { ValidatedTextField } from '../../../../components'
import { fields } from '.'

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
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { control, handleSubmit } = useForm<ProfileData>({
    mode: 'onBlur',
    defaultValues: propUserData,
  })

  const onSubmit: SubmitHandler<ProfileData> = async userData => {
    setLoading(true)
    try {
      await saveUserData(userData)
      exitEditMode()
      onDataChanged()
    } catch (err) {
      const error = err as Record<
        string,
        Record<string, Record<string, string>>
      >
      const message = error.response.data.reason
      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    exitEditMode()
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} justifyContent="center">
        {loading && <LoadingSpinner />}
        {!loading &&
          Object.entries(fields).map(item => {
            const [fieldName, fieldProps] = item
            const disabled = !editMode

            return (
              <Grid item xs={8} key={fieldName}>
                <ValidatedTextField
                  label={fieldProps.label}
                  // @ts-ignore
                  name={fieldName}
                  control={control}
                  rules={{
                    pattern: fieldProps.pattern,
                  }}
                  autoComplete={fieldProps.autocomplete}
                  type={fieldProps.type}
                  placeholder={fieldProps.placeholder}
                  disabled={disabled}
                />
              </Grid>
            )
          })}
      </Grid>
      {errorMessage ? <StyledError>{errorMessage}</StyledError> : ''}
      {editMode && (
        <ButtonsContainer>
          <Button fullWidth variant="contained" type="submit" color="primary">
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
