import { AuthApiService } from 'src/modules/auth';
import { createURLSearchParamsFromRequest } from 'src/shared/utils/utilsRequest';
import { TKey } from 'src/shared/types/Key';
import { IResponse } from 'src/shared/types/Response';
import { IUserRole } from '../domain/UserRole';
import { IUserRoleCreateRequest } from './UserRoleCreateRequest';
import { IUserRoleRequest } from './UserRoleUpdateRequest';
import { IUserRolesRequest } from './UserRolesRequest';
import { IUserRolesResponse } from './UserRolesResponse';
import { IUserRoleResponse } from './UserRoleResponse';

class UserRoleApiService extends AuthApiService 
{
  private static _UserRoleApi: UserRoleApiService;

  public static override get Instance(): UserRoleApiService 
  {
    return (this._UserRoleApi || (this._UserRoleApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserRoleAsync = this.createUserRoleAsync.bind(this);
    this.addUserRoleAsync = this.addUserRoleAsync.bind(this);
    this.updateUserRoleAsync = this.updateUserRoleAsync.bind(this);
    this.getUserRoleAsync = this.getUserRoleAsync.bind(this);
    this.getUserRolesAsync = this.getUserRolesAsync.bind(this);
    this.removeUserRoleAsync = this.removeUserRoleAsync.bind(this);
  } 

  public async createUserRoleAsync(createParams: IUserRoleCreateRequest):Promise<IUserRoleResponse> 
  {
    const url = 'api/userRole/create';

    const response = await this.post<IUserRoleResponse, IUserRoleCreateRequest>(url, createParams);
    return response.data;
  }

  public async addUserRoleAsync():Promise<IUserRoleResponse> 
  {
    const url = 'api/userRole/create';

    const createParams:IUserRoleCreateRequest =
    {
      name: 'name',
      displayName: 'Новая роль'
    }

    const response = await this.post<IUserRoleResponse, IUserRoleCreateRequest>(url, createParams);
    return response.data;
  }

  public async updateUserRoleAsync(updatedUserRole: IUserRoleRequest):Promise<IUserRoleResponse> 
  {
    const url = 'api/userRole/update';

    const response = await this.put<IUserRoleResponse, IUserRoleRequest>(url, updatedUserRole);
    return response.data;
  }   

  public async getUserRoleAsync(id: number):Promise<IUserRole> 
  {
    const url = 'api/userRole/get';

    const get:URLSearchParams = new URLSearchParams();
    get.append('id', id.toString())

    const response = await this.get<IUserRole>(url, {params: get});
    return response.data;
  }

  public async getUserRolesAsync(request: IUserRolesRequest):Promise<IUserRolesResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/userRole/getall';

    const response = await this.get<IUserRolesResponse>(url, {params: search});
    return response.data;   
  }  

  public async removeUserRoleAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/userRole/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }    
}

/**
 * Глобальный экземпляр для доступа к Api для работы с ролями 
 */
export const UserRoleApi = UserRoleApiService.Instance;