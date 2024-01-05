import { AxiosInstance } from 'axios';

import { axiosInstance } from '@app/api/axios.api';
import { RoomModel } from '@core/models';
import { IApiResponse } from '@shared/interfaces';

class RoomsApi {
  private path = 'rooms';

  constructor(private readonly instance: AxiosInstance) {}

  public async getRooms(): Promise<IApiResponse<RoomModel[]>> {
    return this.instance.get(this.path);
  }
}

export const roomsApi = new RoomsApi(axiosInstance);
