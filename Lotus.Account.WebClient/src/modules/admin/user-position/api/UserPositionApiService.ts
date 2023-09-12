import { AuthApiService } from 'src/modules/auth';
import { TKey } from 'src/shared/types/Key';
import { IResponse } from 'src/shared/types/Response';
import { createURLSearchParamsFromRequest } from 'src/shared/utils/utilsRequest';
import { IUserPosition } from '../domain/UserPosition';
import { IUserPositionCreateRequest } from './UserPositionCreateRequest';
import { IUserPositionUpdateRequest } from './UserPositionRequest';
import { IUserPositionsRequest } from './UserPositionsRequest';
import { IUserPositionsResponse } from './UserPositionsResponse';
import { IUserPositionResponse } from './UserPositionResponse';

class UserPositionApiService extends AuthApiService 
{
  private static _UserPositionApi: UserPositionApiService;

  public static override get Instance(): UserPositionApiService 
  {
    return (this._UserPositionApi || (this._UserPositionApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserPositionAsync = this.createUserPositionAsync.bind(this);
    this.addUserPositionAsync = this.addUserPositionAsync.bind(this);
    this.updateUserPositionAsync = this.updateUserPositionAsync.bind(this);
    this.getUserPositionsAsync = this.getUserPositionsAsync.bind(this);
    this.removeUserPositionAsync = this.removeUserPositionAsync.bind(this);
  } 

  public async createUserPositionAsync(createParams: IUserPositionCreateRequest):Promise<IUserPositionResponse> 
  {
    const url = 'api/userPosition/create';

    const response = await this.post<IUserPositionResponse, IUserPositionCreateRequest>(url, createParams);
    return response.data;
  }

  public async addUserPositionAsync():Promise<IUserPositionResponse> 
  {
    const url = 'api/userPosition/create';

    const createParams:IUserPositionCreateRequest =
    {
      name: 'Новая должность',
      displayName: 'Краткое имя'
    }

    const response = await this.post<IUserPositionResponse, IUserPositionCreateRequest>(url, createParams);
    return response.data;
  } 

  public async updateUserPositionAsync(updatedUserPosition: IUserPositionUpdateRequest):Promise<IUserPositionResponse> 
  {
    const url = 'api/userPosition/update';

    const response = await this.put<IUserPositionResponse, IUserPositionUpdateRequest>(url, updatedUserPosition);
    return response.data;
  }

  public async getUserPositionAsync(id: number):Promise<IUserPosition> 
  {
    const url = 'api/userPosition/get';

    const get:URLSearchParams = new URLSearchParams();
    get.append('id', id.toString())

    const response = await this.get<IUserPosition>(url, {params: get});
    return response.data;
  }

  public async getUserPositionsAsync(request: IUserPositionsRequest):Promise<IUserPositionsResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/userPosition/getall';

    const response = await this.get<IUserPositionsResponse>(url, {params: search});
    return response.data;   
  }  

  public async removeUserPositionAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/userPosition/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с должностями 
 */
export const UserPositionApi = UserPositionApiService.Instance;