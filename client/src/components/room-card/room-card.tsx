import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Avatar } from '@app/components';
import { Paths } from '@app/router';
import { RoomModel } from '@core/models';

import style from './room-card.module.scss';

interface IProps {
  data: RoomModel;
  onClick?: () => void;
}

export const RoomCard = ({ data: { description, name, id }, onClick }: IProps): ReactElement => {

  return (
    <NavLink
      to={Paths.ROOM_PAGE.replace(':id', id)}
      className={({ isActive }) => classNames(style.roomCard, { [style.active]: isActive })}
      onClick={onClick}
    >
      <div>
        <Avatar name={name} />
      </div>
      <div className={style.roomCardDescription}>
        <p>{name}</p>
        {description && <span>{description}</span>}
      </div>
    </NavLink>
  );
};
