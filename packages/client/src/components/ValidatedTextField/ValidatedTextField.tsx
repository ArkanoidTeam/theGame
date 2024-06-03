import { TextField } from '@mui/material';
import { Control, Controller, FieldValues, Path, PathValue, RegisterOptions } from 'react-hook-form';

type TValidatedTextFieldProps<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    control: Control<T, any>;
    type?: React.HTMLInputTypeAttribute;
    autoComplete?: string;
    rules?: Omit<RegisterOptions<T, Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
}

const ValidatedTextField = <T extends FieldValues>({
    label, name, control, type, autoComplete, rules
}: TValidatedTextFieldProps<T>) => (
    <Controller
        name={name}
        defaultValue={'' as PathValue<T, Path<T>>}
        control={control}
        rules={{
            required: 'Поле должно быть заполнено',
            ...rules
        }}
        render={({
            field: { onChange, onBlur, value },
            fieldState: { error, invalid }
        }) => (
            <TextField
                variant="standard"
                fullWidth
                label={label}
                type={type}
                autoComplete={autoComplete}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                helperText={error?.message}
                error={invalid}
            />
        )}
    />
)

export default ValidatedTextField;
