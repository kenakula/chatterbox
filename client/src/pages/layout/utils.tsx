import { MenuItemType } from 'antd/es/menu/hooks/useItems';

import { UserOutlined } from '@ant-design/icons';
import { IMenuInfo } from '@pages/layout/interfaces';
import { IUser } from '@shared/interfaces';

export const convertUsersToMenuItems = (users: IUser[], clickHandler: (info: IMenuInfo) => void): MenuItemType[] => {
  return users.map(
    ({ _id, username }) => ({ label: username, key: _id, icon: <UserOutlined />, onClick: clickHandler }));
};
