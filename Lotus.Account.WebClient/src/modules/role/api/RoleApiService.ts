import { ApiService } from 'src/core/api/ApiService';
import { IResponse } from 'src/core/types/Response';
import { TKey } from 'src/core/types/Key';
import { createURLSearchParamsFromRequest } from 'src/shared/request/utils';
import { IRole } from '../domain/Role';
import { mockRoles } from '../mock/RoleMock';
import { IRoleCreateRequest } from './RoleCreateRequest';
import { IRoleUpdateRequest } from './RoleUpdateRequest';
import { IRolesRequest } from './RolesRequest';
import { IRolesResponse } from './RolesResponse';
import { IRoleResponse } from './RoleResponse';

class RoleApiService extends ApiService 
{
  private static _RoleApi: RoleApiService;

  public static get Instance(): RoleApiService 
  {
    return (this._RoleApi || (this._RoleApi = new this()));
  }

  constructor()
  {
    super();
    this.getRolesAsync = this.getRolesAsync.bind(this);
    this.createRoleAsync = this.createRoleAsync.bind(this);
    this.addRoleAsync = this.addRoleAsync.bind(this);
    this.updateRoleAsync = this.updateRoleAsync.bind(this);
    this.removeRoleAsync = this.removeRoleAsync.bind(this);
  } 

  public async createRoleAsync(createParams: IRoleCreateRequest):Promise<IRoleResponse> 
  {
    const url = 'api/role/create';

    const response = await this.post<IRoleResponse, IRoleCreateRequest>(url, createParams);
    return response.data;
  }

  public async addRoleAsync():Promise<IRoleResponse> 
  {
    const url = 'api/role/create';

    const createParams:IRoleCreateRequest =
    {
      systemName: 'systemName',
      dispalyName: 'Новое разрешение'
    }

    const response = await this.post<IRoleResponse, IRoleCreateRequest>(url, createParams);
    return response.data;
  } 

  public async getRoleAsync(id: number):Promise<IRole> 
  {
    // const url = 'connect/token';

    // const response = await this.get<IRole>(url);
    // return response.data;

    return new Promise<IRole>((resolve)=>
    {
      setTimeout(() => resolve(mockRoles[id - 1]), 500)
    });
  }    

  public async updateRoleAsync(updatedRole: IRoleUpdateRequest):Promise<IRoleResponse> 
  {
    const url = 'api/role/update';

    const response = await this.put<IRoleResponse, IRoleUpdateRequest>(url, updatedRole);
    return response.data;
  } 

  public async removeRoleAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/role/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }    

  public async getRolesAsync(request: IRolesRequest):Promise<IRolesResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/role/getall';

    const response = await this.get<IRolesResponse>(url, {params: search});
    return response.data;   
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с ролями 
 */
export const RoleApi = RoleApiService.Instance;