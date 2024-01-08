import { useNavigate } from 'react-router-dom';

import { Paths } from './constants.router';

interface IHookValue {
  trigger: (id: string) => void;
}

export const useNavigateToRoom = (): IHookValue => {
  const navigate = useNavigate();

  const trigger = (id: string): void => {
    navigate(Paths.ROOM_PAGE.replace(':id', id));
  };

  return {
    trigger,
  };
};
