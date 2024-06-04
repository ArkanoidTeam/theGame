import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import { ButtonsContainer, StyledForm } from './styled'
import saveUserData from '../../api/saveUserData'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import {
  ValidationType,
  validationPatterns,
} from '../../../../utils/validation'
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
  const fields = {
    login: {
      label: 'Логин',
      placeholder: 'Логин',
      type: 'text',
      pattern: validationPatterns[ValidationType.LOGIN],
    },
    email: {
      label: 'Почта',
      placeholder: 'Почта',
      type: 'email',
      pattern: validationPatterns[ValidationType.EMAIL],
    },
    first_name: {
      label: 'Имя',
      placeholder: 'Имя',
      type: 'text',
      pattern: validationPatterns[ValidationType.USER],
    },
    second_name: {
      label: 'Фамилия',
      placeholder: 'Фамилия',
      type: 'text',
      pattern: validationPatterns[ValidationType.USER],
    },
    phone: {
      label: 'Телефон',
      placeholder: '+7 (000) 000-00-00',
      type: 'tel',
      pattern: validationPatterns[ValidationType.PHONE],
    },
  }
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<ProfileData>({
    mode: 'onBlur',
    defaultValues: propUserData,
  })

  const onSubmit: SubmitHandler<ProfileData> = async userData => {
    setLoading(true)
    try {
      await saveUserData(userData)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      exitEditMode()
      onDataChanged()
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
                  autoComplete={fieldName}
                  type={fieldProps.type}
                  placeholder={fieldProps.placeholder}
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
