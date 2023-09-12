import { IResponsePage } from 'src/shared/types/Response';
import { IUserNotification } from '../domain/UserNotification';

export interface IUserNotificationsResponse extends IResponsePage<IUserNotification>
{
}