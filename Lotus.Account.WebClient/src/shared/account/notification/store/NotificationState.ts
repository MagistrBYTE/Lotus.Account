import { INotification } from '../domain/Notification';

export interface INotificationState
{
    notifications?: INotification[];
    countNotRead?: number;
}