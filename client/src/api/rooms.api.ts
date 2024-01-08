import { AxiosInstance } from 'axios';

import { axiosInstance } from '@app/api/axios.api';
import { RoomModel } from '@core/models';
import { IApiResponse, ICreateRoomDTO, IUpdateRoomDTO } from '@shared/interfaces';

class RoomsApi {
  private path = 'rooms';

  constructor(private readonly instance: AxiosInstance) {}

  public async createRoom(data: ICreateRoomDTO): Promise<IApiResponse<RoomModel>> {
    return this.instance.post(this.path, data);
  }

  public async getRooms(filter: Pick<RoomModel, 'name'>): Promise<IApiResponse<RoomModel[]>> {
    const paramEntries = Object.entries(filter).filter(([, value]) => Boolean(value));
    const params = Object.fromEntries(paramEntries);

    return this.instance.get(this.path, {
      params,
    });
  }

  public async getRoomInfo(id?: string): Promise<IApiResponse<RoomModel>> {
    return this.instance.get(`${this.path}/${id}`);
  }

  public async updateRoom(data: IUpdateRoomDTO, id?: string): Promise<IApiResponse<RoomModel>> {
    console.log('=>(rooms.api.ts:30) data', data);
    return this.instance.patch(`${this.path}/${id}`, {
      data,
    });
  }
}

export const roomsApi = new RoomsApi(axiosInstance);
