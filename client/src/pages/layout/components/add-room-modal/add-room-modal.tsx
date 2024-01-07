import { ReactElement, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Input, Modal } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';

import { newRoomSchema } from './constants';
import { IAddRoom } from './interfaces';

interface IProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export const AddRoomModal = ({ isModalOpen, onClose }: IProps): ReactElement => {
  const formId = useId();

  const { control, handleSubmit } = useForm<IAddRoom>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(newRoomSchema),
  });

  const onSubmit = (data: IAddRoom): void => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title="New room"
      acceptBtn={{ type: 'submit', formId, text: 'Save' }}
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
