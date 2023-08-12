import { IResponse } from 'src/core/types/Response';
import { TKey } from 'src/core/types/Key';
import { ISelectOption } from 'src/core/types/SelectOption';
import { createURLSearchParamsFromRequest } from 'src/shared/request/utils';
import { AuthApiService } from 'src/shared/auth/api/AuthApiService';
import { IGroup } from '../domain/Group';
import { IGroupCreateRequest } from './GroupCreateRequest';
import { IGroupUpdateRequest } from './GroupUpdateRequest';
import { IGroupsRequest } from './GroupsRequest';
import { IGroupsResponse } from './GroupsResponse';
import { IGroupResponse } from './GroupResponse';


class GroupApiService extends AuthApiService 
{
  private static _GroupApi: GroupApiService;

  public static get Instance(): GroupApiService 
  {
    return (this._GroupApi || (this._GroupApi = new this()));
  }

  constructor()
  {
    super();
    this.getGroupsAsync = this.getGroupsAsync.bind(this);
    this.getGroupAsync = this.getGroupAsync.bind(this);
    this.getGroupsAsOptionsAsync = this.getGroupsAsOptionsAsync.bind(this);
    this.createGroupAsync = this.createGroupAsync.bind(this);
    this.addGroupAsync = this.addGroupAsync.bind(this);
    this.updateGroupAsync = this.updateGroupAsync.bind(this);
    this.removeGroupAsync = this.removeGroupAsync.bind(this);
  } 

  public async createGroupAsync(createParams: IGroupCreateRequest):Promise<IGroupResponse> 
  {
    const url = 'api/group/create';

    const response = await this.post<IGroupResponse, IGroupCreateRequest>(url, createParams);
    return response.data;
  }

  public async addGroupAsync():Promise<IGroupResponse> 
  {
    const url = 'api/group/create';

    const createParams:IGroupCreateRequest =
    {
      name: 'Новая группа',
      shortName: 'Краткое имя'
    }

    const response = await this.post<IGroupResponse, IGroupCreateRequest>(url, createParams);
    return response.data;
  } 

  public async getGroupAsync(id: number):Promise<IGroupResponse> 
  {
    const url = 'api/group/get';

    const response = await this.get<IGroupResponse>(url);
    return response.data;
  }    

  public async updateGroupAsync(updatedGroup: IGroupUpdateRequest):Promise<IGroupResponse> 
  {
    const url = 'api/group/update';

    const response = await this.put<IGroupResponse, IGroupUpdateRequest>(url, updatedGroup);
    return response.data;
  } 

  public async removeGroupAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/group/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }    

  public async getGroupsAsync(request: IGroupsRequest):Promise<IGroupsResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/group/getall';

    const response = await this.get<IGroupsResponse>(url, {params: search});
    return response.data;   
  }

  public async getGroupsAsOptionsAsync():Promise<ISelectOption<string>[]>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest();

    const url = 'api/group/getall';

    const response = await this.get<IGroupsResponse>(url, {params: search});

    const payload:IGroup[] = response.data.payload!;

    const options:ISelectOption<string>[] = payload.map((x)=>
    {
      const option: ISelectOption<string> = {text: x.name!, value: String(x.id)};
      return option;
    });

    return Promise.resolve<ISelectOption<string>[]>(options); 
  }  
}

/**
 * Глобальный экземпляр для доступа к Api для работы с группами 
 */
export const GroupApi = GroupApiService.Instance;