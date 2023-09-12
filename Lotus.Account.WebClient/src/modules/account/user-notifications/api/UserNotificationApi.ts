import { AuthApiService } from 'src/modules/auth';
import { TKey } from 'src/shared/types/Key';
import { mockUserNotificationsGroupByDate } from '../mock/UserNotificationMock';
import { IUserNotificationCreateRequest } from './UserNotificationCreateRequest';
import { IUserNotificationsRequest } from './UserNotificationsRequest';
import { IUserNotificationsResponse } from './UserNotificationsResponse';
import { IUserNotificationResponse } from './UserNotificationResponse';
import { IUserNotificationRequest } from './UserNotificationRequest';

class UserNotificationApiService extends AuthApiService 
{
  private static _UserNotificationApi: UserNotificationApiService;

  public static override get Instance(): UserNotificationApiService 
  {
    return (this._UserNotificationApi || (this._UserNotificationApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserNotificationAsync = this.createUserNotificationAsync.bind(this);
    this.updateUserNotificationAsync = this.updateUserNotificationAsync.bind(this);
    this.getUserNotificationsAsync = this.getUserNotificationsAsync.bind(this);
    this.getUserNotificationAsync = this.getUserNotificationAsync.bind(this);
    this.removeUserNotificationAsync = this.removeUserNotificationAsync.bind(this);
  } 

  public async createUserNotificationAsync(createParams: IUserNotificationCreateRequest):Promise<IUserNotificationResponse> 
  {
    const url = 'api/userNotification/create';

    const response = await this.post<IUserNotificationResponse, IUserNotificationCreateRequest>(url, createParams);
    return response.data;
  }

  public async updateUserNotificationAsync(updatedUserNotification: IUserNotificationRequest):Promise<IUserNotificationResponse> 
  {
    const url = 'api/userNotification/update';

    const response = await this.put<IUserNotificationResponse, IUserNotificationRequest>(url, updatedUserNotification);
    return response.data;
  }   

  public async getUserNotificationAsync(id: number):Promise<IUserNotificationResponse> 
  {
    const url = 'api/userNotification/get';

    const response = await this.get<IUserNotificationResponse>(url);
    return response.data;
  }
  
  public async getUserNotificationsAsync(request: IUserNotificationsRequest):Promise<IUserNotificationsResponse>
  {
    // const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    // const url = 'api/notification/getall';

    // const response = await this.get<IUserNotificationsResponse>(url, {params: search});
    // return response.data;   

    const userNotifications = mockUserNotificationsGroupByDate(8, 2, 8);

    const start = request.pageInfo!.pageNumber * request.pageInfo!.pageSize;
    const end = start + request.pageInfo!.pageSize;

    const userNotificationsAll = userNotifications.flatMap(x => x.items);
    const userNotificationsPage = userNotificationsAll.slice(start, end);

    const response: IUserNotificationsResponse = 
    {
      pageInfo:
      {
        totalCount: userNotificationsAll.length,
        pageNumber:request.pageInfo!.pageNumber,
        pageSize: request.pageInfo!.pageSize,
        currentPageSize: userNotificationsPage.length
      },

      payload: userNotificationsPage
    }

    return Promise.resolve<IUserNotificationsResponse>((response))
  }  

  public async removeUserNotificationAsync(id: TKey):Promise<Response> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/userNotification/delete';

    const response = await this.delete<Response>(url, {params: delet});
    return response.data;
  }    
}

/**
 * Глобальный экземпляр для доступа к Api для работы с уведомлениями пользователя
 */
export const UserNotificationApi = UserNotificationApiService.Instance;