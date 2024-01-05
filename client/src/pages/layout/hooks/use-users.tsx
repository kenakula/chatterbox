import { useEffect, useState } from 'react';

import { usersApi } from '@app/api/users.api';

import { IMenuInfo } from '../interfaces';

export interface IProps {
  debouncedValue: string;
  clickHandler: (info: IMenuInfo) => void;
}

export interface IValue {
  users: MenuItemType[];
  isFetching: boolean;
  isError: boolean;
}

export const useUsers = ({ debouncedValue, clickHandler }: IProps): IValue => {
  const [users, setUsers] = useState<MenuItemType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchUsers = async (): Promise<void> => {
    if (isFetching) return;

    if (!debouncedValue) {
      setUsers([]);

      return;
    }

    try {
      setIsFetching(true);
      const { data } = await usersApi.getUsers({ username: debouncedValue });
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    searchUsers();
  }, [debouncedValue]);

  return {
    users,
    isError,
    isFetching,
  };
};
