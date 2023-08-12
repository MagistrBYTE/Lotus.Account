import { IResponse } from 'src/core/types/Response';
import { TKey } from 'src/core/types/Key';
import { createURLSearchParamsFromRequest } from 'src/shared/request/utils';
import { AuthApiService } from 'src/shared/auth/api/AuthApiService';
import { IPosition } from '../domain/Position';
import { mockPositions } from '../mock/PositionMock';
import { IPositionCreateRequest } from './PositionCreateRequest';
import { IPositionUpdateRequest } from './PositionUpdateRequest';
import { IPositionsRequest } from './PositionsRequest';
import { IPositionsResponse } from './PositionsResponse';
import { IPositionResponse } from './PositionResponse';

class PositionApiService extends AuthApiService 
{
  private static _PositionApi: PositionApiService;

  public static get Instance(): PositionApiService 
  {
    return (this._PositionApi || (this._PositionApi = new this()));
  }

  constructor()
  {
    super();
    this.getPositionsAsync = this.getPositionsAsync.bind(this);
    this.createPositionAsync = this.createPositionAsync.bind(this);
    this.addPositionAsync = this.addPositionAsync.bind(this);
    this.updatePositionAsync = this.updatePositionAsync.bind(this);
    this.removePositionAsync = this.removePositionAsync.bind(this);
  } 

  public async createPositionAsync(createParams: IPositionCreateRequest):Promise<IPositionResponse> 
  {
    const url = 'api/position/create';

    const response = await this.post<IPositionResponse, IPositionCreateRequest>(url, createParams);
    return response.data;
  }

  public async addPositionAsync():Promise<IPositionResponse> 
  {
    const url = 'api/position/create';

    const createParams:IPositionCreateRequest =
    {
      name: 'Новая должность',
      shortName: 'Краткое имя'
    }

    const response = await this.post<IPositionResponse, IPositionCreateRequest>(url, createParams);
    return response.data;
  } 

  public async getPositionAsync(id: number):Promise<IPosition> 
  {
    // const url = 'connect/token';

    // const response = await this.get<IPosition>(url);
    // return response.data;

    return new Promise<IPosition>((resolve)=>
    {
      setTimeout(() => resolve(mockPositions[id - 1]), 500)
    });
  }    

  public async updatePositionAsync(updatedPosition: IPositionUpdateRequest):Promise<IPositionResponse> 
  {
    const url = 'api/position/update';

    const response = await this.put<IPositionResponse, IPositionUpdateRequest>(url, updatedPosition);
    return response.data;
  } 

  public async removePositionAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/position/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }    

  public async getPositionsAsync(request: IPositionsRequest):Promise<IPositionsResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/position/getall';

    const response = await this.get<IPositionsResponse>(url, {params: search});
    return response.data;   
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с должностями 
 */
export const PositionApi = PositionApiService.Instance;