import { useEffect, useRef, useState } from 'react';

import { roomsApi } from '@app/api/rooms.api';
import { RoomModel } from '@core/models';

interface IHookValue {
  data: RoomModel[];
}

export const useGetRooms = (): IHookValue => {
  const roomsFetching = useRef<boolean>(false);
  const [rooms, setRooms] = useState<RoomModel[]>([]);

  const fetchRooms = async (): Promise<void> => {
    try {
      const data = await roomsApi.getRooms().then(res => res.data);
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
  }, []);

  return {
    data: rooms,
  };
};
