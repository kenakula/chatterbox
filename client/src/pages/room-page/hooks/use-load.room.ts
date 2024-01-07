import { useEffect, useRef, useState } from 'react';

import { roomsApi } from '@app/api/rooms.api';
import { MessageModel, RoomModel } from '@core/models';
import { useStore } from '@store/store';

interface IHookProps {
  roomId?: string;
}

interface IHookValue {
  isError: boolean;
  data?: RoomModel;
  messages: MessageModel[];
  addMessage: (message: MessageModel) => void;
}

export const useLoadRoom = ({ roomId }: IHookProps): IHookValue => {
  const isLoading = useRef<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<RoomModel>();
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const { setCurrentRoom } = useStore();

  const fetchData = async (): Promise<void> => {
    try {
      const result = await roomsApi.getRoomInfo(roomId).then(res => res.data);
      setCurrentRoom(result);
      setData(result);
      setMessages(result.messages);
      document.title = `Room | ${result.name}`;
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      isLoading.current = false;
    }
  };

  const addMessage = async (message: MessageModel): Promise<void> => {
    setMessages(prev => [...prev, message]);
  };

  useEffect(() => {
    if (!isLoading.current) {
      isLoading.current = true;
      setIsError(false);

      (async () => {
        await fetchData();
      })();
    }

    return () => {
      document.title = 'Chatterbox';
    };
  }, [roomId]);

  return {
    isError,
    data,
    messages,
    addMessage,
  };
};
