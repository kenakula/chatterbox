import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';

import { roomsApi } from '@app/api/rooms.api';
import { RoomModel } from '@core/models';

interface IHookValue {
  data: RoomModel[];
  inputValue: string;
  onInputChange: (value: string) => void;
  isFetching: boolean;
}

export const useGetRooms = (): IHookValue => {
  const roomsFetching = useRef<boolean>(false);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useDebounce(
    () => {
      setDebouncedValue(inputValue);
    },
    300,
    [inputValue],
  );

  const onInputChange = (value: string): void => {
    setInputValue(value);
  };

  const fetchRooms = async (): Promise<void> => {
    try {
      const data = await roomsApi.getRooms({ name: debouncedValue }).then(res => res.data);
      setRooms(data);
    } catch (err) {
      console.error(err);
    } finally {
      roomsFetching.current = false;
    }
  };

  useEffect(() => {
    if (!roomsFetching.current) {
      roomsFetching.current = true;
      fetchRooms();
    }
  }, [debouncedValue]);

  return {
    data: rooms,
    inputValue,
    onInputChange,
    isFetching: roomsFetching.current,
  };
};
