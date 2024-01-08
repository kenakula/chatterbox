import { ReactElement, useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';

import { roomsApi } from '@app/api/rooms.api';
import { FormField, Modal } from '@app/components';
import { useNavigateToRoom } from '@app/router';
import { RoomModel } from '@core/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { IApiResponse, ICreateRoomDTO } from '@shared/interfaces';
import { useStore } from '@store/store';

import { formFields, formSchema } from './constants';
import { IRoomModalForm } from './interfaces';
import style from './room-modal.module.scss';

export const RoomModal = (): ReactElement => {
  const formId = useId();
  const { trigger } = useNavigateToRoom();

  const {
    currentRoom,
    setRoomModalOpenState,
    isRoomModalOpened,
    roomModalMode,
    addRoom,
    user,
  } = useStore();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<IRoomModalForm>({
    resolver: yupResolver(formSchema),
  });

  const roomModalTitle = roomModalMode === 'create' ? 'Create Room' : 'Edit room';

  useEffect(() => {
    if (roomModalMode === 'create') {
      reset({ name: '', description: '' });

      return;
    }

    reset({ name: currentRoom?.name, description: currentRoom?.description });
  }, [roomModalMode]);

  const handleClose = (): void => {
    setRoomModalOpenState(false);
  };

  const handleSaveRoom = async ({ name, description }: IRoomModalForm): Promise<IApiResponse<RoomModel>> => {
    const dto: ICreateRoomDTO = {
      name,
      description,
      messages: [],
      creator: user?.id ?? '',
      users: [user?.id ?? ''],
    };

    return roomsApi.createRoom(dto);
  };

  const handleEditRoom = async (data: IRoomModalForm): Promise<IApiResponse<RoomModel>> => {
    return roomsApi.updateRoom(data, currentRoom?.id);
  };

  const formAction = roomModalMode === 'create' ? handleSaveRoom : handleEditRoom;

  const onSubmit = async (data: IRoomModalForm): Promise<void> => {
    formAction(data).then((result) => {
      switch (roomModalMode) {
        case 'create':
          addRoom(result.data);
          trigger(result.data.id);
          break;
        default:
          break;
      }
    })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        reset();
        handleClose();
      });
  };

  return (
    <Modal isOpen={isRoomModalOpened} onClose={handleClose} title={roomModalTitle} formId={formId}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)} id={formId}>
        {formFields.map(field => (
          <FormField key={field.name} field={field} control={control} />
        ))}
      </form>
    </Modal>
  );
};
