import { IUserNotification } from '../domain/UserNotification';

export interface IUserNotificationState
{
    notifications?: IUserNotification[];
    countNotRead?: number;
}