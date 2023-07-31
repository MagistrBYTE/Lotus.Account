import { ApiService } from 'src/core/api/ApiService';
import { IResponse } from 'src/core/types/Response';
import { TKey } from 'src/core/types/Key';
import { ISelectOption } from 'src/core/types/SelectOption';
import { IResult } from 'src/core/types/Result';
import { createURLSearchParamsFromRequest } from 'src/shared/request/utils';
import { IPermission } from '../domain/Permission';
import { mockPermissions } from '../mock/PermissionMock';
import { IPermissionCreateRequest } from './PermissionCreateRequest';
import { IPermissionUpdateRequest } from './PermissionUpdateRequest';
import { IPermissionsRequest } from './PermissionsRequest';
import { IPermissionsResponse } from './PermissionsResponse';
import { IPermissionResponse } from './PermissionResponse';

class PermissionApiService extends ApiService 
{
  private static _PermissionApi: PermissionApiService;

  public static get Instance(): PermissionApiService 
  {
    return (this._PermissionApi || (this._PermissionApi = new this()));
  }

  constructor()
  {
    super();
    this.getPermissionsAsync = this.getPermissionsAsync.bind(this);
    this.createPermissionAsync = this.createPermissionAsync.bind(this);
    this.addPermissionAsync = this.addPermissionAsync.bind(this);
    this.updatePermissionAsync = this.updatePermissionAsync.bind(this);
    this.removePermissionAsync = this.removePermissionAsync.bind(this);
  } 

  public async createPermissionAsync(createParams: IPermissionCreateRequest):Promise<IPermissionResponse> 
  {
    const url = 'api/permission/create';

    const response = await this.post<IPermissionResponse, IPermissionCreateRequest>(url, createParams);
    return response.data;
  }

  public async addPermissionAsync():Promise<IPermissionResponse> 
  {
    const url = 'api/permission/create';

    const createParams:IPermissionCreateRequest =
    {
      systemName: 'systemName',
      dispalyName: 'Новое разрешение'
    }

    const response = await this.post<IPermissionResponse, IPermissionCreateRequest>(url, createParams);
    return response.data;
  } 

  public async getPermissionAsync(id: number):Promise<IPermission> 
  {
    // const url = 'connect/token';

    // const response = await this.get<IPermission>(url);
    // return response.data;

    return new Promise<IPermission>((resolve)=>
    {
      setTimeout(() => resolve(mockPermissions[id - 1]), 500)
    });
  }    

  public async updatePermissionAsync(updatedPermission: IPermissionUpdateRequest):Promise<IPermissionResponse> 
  {
    const url = 'api/permission/update';

    const response = await this.put<IPermissionResponse, IPermissionUpdateRequest>(url, updatedPermission);
    return response.data;
  } 

  public async removePermissionAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/permission/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }    

  public async getPermissionsAsync(request: IPermissionsRequest):Promise<IPermissionsResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/permission/getall';

    try 
    {
      const response = await this.get<IPermissionsResponse>(url, {params: search});
      return response.data;
    }
    catch (error) 
    {
      const errorResult: IResult = error as IResult;
      if(errorResult.code == 500)
      {
        return new Promise<IPermissionsResponse>((resolve)=>
        {
          const cache: IPermissionsResponse  =
          {
            pageInfo: {pageNumber: 0, pageSize: request.pageInfo.pageSize, currentPageSize: mockPermissions.length, totalCount: mockPermissions.length},
            payload: mockPermissions,
            result: {succeeded: true, code: 117, message: 'Получениы кешированные данные'}

          }
          setTimeout(() => resolve(cache), 500)
        });
      }
      else
      {
        throw(error);
      }
    }
  }

  public async getPermissionsAsOptionsAsync():Promise<ISelectOption<string>[]>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest();

    const url = 'api/permission/getall';

    const response = await this.get<IPermissionsResponse>(url, {params: search});

    const payload:IPermission[] = response.data.payload!;

    const options:ISelectOption<string>[] = payload.map((x)=>
    {
      const option: ISelectOption<string> = {text: x.dispalyName!, value: String(x.id)};
      return option;
    });

    return Promise.resolve<ISelectOption<string>[]>(options); 
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с разрешениями 
 */
export const PermissionApi = PermissionApiService.Instance;