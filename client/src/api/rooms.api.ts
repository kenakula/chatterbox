import { AxiosInstance } from 'axios';

import { axiosInstance } from '@app/api/axios.api';
import { RoomModel } from '@core/models';
import { IApiResponse } from '@shared/interfaces';

class RoomsApi {
  private path = 'rooms';

  constructor(private readonly instance: AxiosInstance) {}

  public async getRooms(filter: Pick<RoomModel, 'name'>): Promise<IApiResponse<RoomModel[]>> {
    const paramEntries = Object.entries(filter).filter(([, value]) => Boolean(value));
    const params = Object.fromEntries(paramEntries);

    return this.instance.get(this.path, {
      params,
    });
  }
}

export const roomsApi = new RoomsApi(axiosInstance);
