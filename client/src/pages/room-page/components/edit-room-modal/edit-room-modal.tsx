import { ReactElement, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Input, Modal } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';

import { editRoomSchema } from './constants';
import { IEditRoom } from './interfaces';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const EditRoomModal = ({ isOpen, handleClose }: IProps): ReactElement => {
  const formId = useId();

  const { control, handleSubmit } = useForm<IEditRoom>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(editRoomSchema),
  });

  const onSubmit = (data: IEditRoom): void => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={isOpen} onClose={handleClose} title="Edit room" acceptBtn={{ type: 'submit', formId, text: 'Edit' }}
      cancelBtn={{}}
    >
      <form onSubmit={handleSubmit(onSubmit)} id={formId}>
        <Controller
          control={control}
          render={({ field, fieldState }) => (
            <Input label="Name" state={fieldState} {...field} />
          )} name="name"
        />
      </form>
    </Modal>
  );
};
