import { IResponse } from 'src/core/types/Response';
import { TKey } from 'src/core/types/Key';
import { AuthApiService } from 'src/shared/auth/AuthApiService';
import { createURLSearchParamsFromRequest } from 'src/shared/request/utils';
import { INotificationCreateRequest } from './NotificationCreateRequest';
import { INotificationUpdateRequest } from './NotificationUpdateRequest';
import { INotificationsRequest } from './NotificationsRequest';
import { INotificationsResponse } from './NotificationsResponse';
import { INotificationResponse } from './NotificationResponse';

class NotificationApiService extends AuthApiService 
{
  private static _NotificationApi: NotificationApiService;

  public static get Instance(): NotificationApiService 
  {
    return (this._NotificationApi || (this._NotificationApi = new this()));
  }

  constructor()
  {
    super();
    this.getNotificationsAsync = this.getNotificationsAsync.bind(this);
    this.getNotificationAsync = this.getNotificationAsync.bind(this);
    this.createNotificationAsync = this.createNotificationAsync.bind(this);
    this.updateNotificationAsync = this.updateNotificationAsync.bind(this);
    this.removeNotificationAsync = this.removeNotificationAsync.bind(this);
  } 

  public async createNotificationAsync(createParams: INotificationCreateRequest):Promise<INotificationResponse> 
  {
    const url = 'api/notification/create';

    const response = await this.post<INotificationResponse, INotificationCreateRequest>(url, createParams);
    return response.data;
  } 

  public async getNotificationAsync(id: number):Promise<INotificationResponse> 
  {
    const url = 'api/notification/get';

    const response = await this.get<INotificationResponse>(url);
    return response.data;
  }    

  public async updateNotificationAsync(updatedNotification: INotificationUpdateRequest):Promise<INotificationResponse> 
  {
    const url = 'api/notification/update';

    const response = await this.put<INotificationResponse, INotificationUpdateRequest>(url, updatedNotification);
    return response.data;
  } 

  public async removeNotificationAsync(id: TKey):Promise<IResponse> 
  {
    const delet:URLSearchParams = new URLSearchParams();
    delet.append('id', id.toString())

    const url = 'api/notification/delete';

    const response = await this.delete<IResponse>(url, {params: delet});
    return response.data;
  }    

  public async getNotificationsAsync(request: INotificationsRequest):Promise<INotificationsResponse>
  {
    const search:URLSearchParams = createURLSearchParamsFromRequest(request);

    const url = 'api/notification/getall';

    const response = await this.get<INotificationsResponse>(url, {params: search});
    return response.data;   
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с уведомлениями 
 */
export const NotificationApi = NotificationApiService.Instance;