import { createAction } from '@reduxjs/toolkit';
import { INotification } from '../domain/Notification';

export const SET_NOTIFICATIONS = 'notification/SET_NOTIFICATIONS' as const;
export const setNotificationsAction = createAction<INotification[]>(SET_NOTIFICATIONS);

export const SET_COUNT_NOT_READ_NOTIFICATIONS = 'notification/SET_COUNT_NOT_READ_NOTIFICATIONS' as const;
export const setCountNotReadNotificationsAction = createAction<number>(SET_COUNT_NOT_READ_NOTIFICATIONS);

export interface IChangeReadStatusNotification
{
    id:string;
    status:boolean;
}

export const CHANGE_READ_STATUS_NOTIFICATION = 'notification/CHANGE_READ_STATUS_NOTIFICATION' as const;
export const changeReadStatusNotificationAction = createAction<IChangeReadStatusNotification>(CHANGE_READ_STATUS_NOTIFICATION);

export interface IChangeArchiveStatusNotification
{
    id:string;
    status:boolean;
}

export const CHANGE_ARCHIVE_STATUS_NOTIFICATION = 'notification/CHANGE_ARCHIVE_STATUS_NOTIFICATION' as const;
export const changeArchiveStatusNotificationAction = createAction<IChangeArchiveStatusNotification>(CHANGE_ARCHIVE_STATUS_NOTIFICATION);