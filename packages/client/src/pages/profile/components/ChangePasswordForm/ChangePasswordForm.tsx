import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import { ButtonsContainer, StyledForm } from './styled'
import savePasswordRequest from '../../api/savePasswordRequest'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import {
  ValidationType,
  validationPatterns,
} from '../../../../utils/validation'
import { ValidatedTextField } from '../../../../components'

interface IProfileProps {
  exitEditMode: () => void
  editMode: boolean
}

const ChangePasswordForm: FC<IProfileProps> = ({ editMode, exitEditMode }) => {
  const fields = {
    oldPassword: {
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
      type: 'password',
      rules: {
        pattern: validationPatterns[ValidationType.PASSOWRD],
      },
    },
    newPassword: {
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
      type: 'password',
      rules: {
        pattern: validationPatterns[ValidationType.PASSOWRD],
      },
    },
    newPasswordAgain: {
      label: 'Новый пароль еще раз',
      placeholder: 'Новый пароль еще раз',
      type: 'password',
      rules: {
        validate: (val: string) => {
          if (watch('newPassword') != val) {
            return 'Пароли не совпадают'
          }
        },
      },
    },
  }

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, watch } = useForm<ChangePasswordData>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<ChangePasswordData> = async ({
    oldPassword,
    newPassword,
  }) => {
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
                  rules={fieldProps.rules}
                  autoComplete={fieldName}
                  type={fieldProps.type}
                  placeholder={fieldProps.placeholder}
                  disabled={disabled}
                />
              </Grid>
            )
          })}
      </Grid>
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
export default ChangePasswordForm
