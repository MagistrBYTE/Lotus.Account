import { AuthApiService } from 'src/modules/auth';
import { TKey } from 'src/shared/types/Key';
import { IResponse } from 'src/shared/types/Response';
import { IResult } from 'src/shared/types/Result';
import { ISelectOption } from 'src/shared/types/SelectOption';
import { createURLSearchParamsFromRequest } from 'src/shared/utils/utilsRequest';
import { IUserPermission } from '../domain/UserPermission';
import { mockUserPermissions } from '../mock/UserPermissionMock';
import { IUserPermissionCreateRequest } from './UserPermissionCreateRequest';
import { IUserPermissionRequest } from './UserPermissionRequest';
import { IUserPermissionsRequest } from './UserPermissionsRequest';
import { IUserPermissionsResponse } from './UserPermissionsResponse';
import { IUserPermissionResponse } from './UserPermissionResponse';

class UserPermissionApiService extends AuthApiService 
{
  private static _UserPermissionApi: UserPermissionApiService;

  public static override get Instance(): UserPermissionApiService 
  {
    return (this._UserPermissionApi || (this._UserPermissionApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserPermissionAsync = this.createUserPermissionAsync.bind(this);
    this.addUserPermissionAsync = this.addUserPermissionAsync.bind(this);
    this.updateUserPermissionAsync = this.updateUserPermissionAsync.bind(this);
    this.getUserPermissionsAsync = this.getUserPermissionsAsync.bind(this);
    this.removeUserPermissionAsync = this.removeUserPermissionAsync.bind(this);
  } 

  public async createUserPermissionAsync(createParams: IUserPermissionCreateRequest):Promise<IUserPermissionResponse> 
  {
    const url = 'api/userPermission/create';

    const response = await this.post<IUserPermissionResponse, IUserPermissionCreateRequest>(url, createParams);
    return response.data;
  }

  public async addUserPermissionAsync():Promise<IUserPermissionResponse> 
  {
    const url = 'api/userPermission/create';

    const createParams:IUserPermissionCreateRequest =
    {
      name: 'name',
      displayName: 'Новое разрешение'
    }

    const response = await this.post<IUserPermissionResponse, IUserPermissionCreateRequest>(url, createParams);
    return response.data;
  } 

  public async updateUserPermissionAsync(updatedUserPermission: IUserPermissionRequest):Promise<IUserPermissionResponse> 
  {
    const url = 'api/userPermission/update';

    const response = await this.put<IUserPermissionResponse, IUserPermissionRequest>(url, updatedUserPermission);
    return response.data;
  }   

  public async getUserPermissionsAsync(request: IUserPermissionsRequest):Promise<IUserPermissionsResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/userPermission/getall';

    try 
    {
      const response = await this.get<IUserPermissionsResponse>(url, {params: search});
      return response.data;
    }
    catch (error) 
    {
      const errorResult: IResult = error as IResult;
      if(errorResult.code == 500)
      {
        return new Promise<IUserPermissionsResponse>((resolve)=>
        {
          const cache: IUserPermissionsResponse  =
          {
            pageInfo: {pageNumber: 0, pageSize: request.pageInfo!.pageSize, currentPageSize: mockUserPermissions.length, totalCount: mockUserPermissions.length},
            payload: mockUserPermissions,
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

  public async getUserPermissionsAsOptionsAsync():Promise<ISelectOption[]>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest();

    const url = 'api/userPermission/getall';

    const response = await this.get<IUserPermissionsResponse>(url, {params: search});

    const payload:IUserPermission[] = response.data.payload!;

    const options:ISelectOption[] = payload.map((x)=>
    {
      const option: ISelectOption = {text: x.displayName!, value: x.id};
      return option;
    });

    return Promise.resolve<ISelectOption[]>(options); 
  }

  public async removeUserPermissionAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/userPermission/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }    
}

/**
 * Глобальный экземпляр для доступа к Api для работы с разрешениями 
 */
export const UserPermissionApi = UserPermissionApiService.Instance;