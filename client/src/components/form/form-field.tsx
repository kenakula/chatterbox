import { ReactElement } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { Input } from '@app/components';
import { IFormField } from '@shared/interfaces';

interface IProps<T extends FieldValues> {
  field: IFormField<T>;
  control: Control<T>;
}

export const FormField = <T extends FieldValues>({
  field: { type, inputType, label, name, placeholder, disabled },
  control,
}: IProps<T>): ReactElement => {
  switch (type) {
    case 'input':
      return (
        <Controller
          control={control} render={({ field, fieldState }) => (
          <Input
            type={inputType}
            label={label} {...field}
            state={fieldState}
            placeholder={placeholder}
            disabled={disabled}
          />
          )}
          name={name}
        />
      );
    default:
      return (
        <div>FormField</div>
      );
  }
};
