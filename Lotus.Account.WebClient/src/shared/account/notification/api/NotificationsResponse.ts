import { IResponsePage } from 'src/core/types/Response';
import { INotification } from '../domain/Notification';

export interface INotificationsResponse extends IResponsePage<INotification>
{
}