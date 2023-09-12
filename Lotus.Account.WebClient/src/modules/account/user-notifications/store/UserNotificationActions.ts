import { createAction } from '@reduxjs/toolkit';
import { IUserNotification } from '../domain/UserNotification';

export const SET_USER_NOTIFICATIONS = 'notification/SET_USER_NOTIFICATIONS' as const;
export const setUserNotificationsAction = createAction<IUserNotification[]>(SET_USER_NOTIFICATIONS);

export const SET_COUNT_NOT_READ_USER_NOTIFICATIONS = 'notification/SET_COUNT_NOT_READ_USER_NOTIFICATIONS' as const;
export const setCountNotReadUserNotificationsAction = createAction<number>(SET_COUNT_NOT_READ_USER_NOTIFICATIONS);

export interface IChangeReadStatusUserNotification
{
    id:string;
    status:boolean;
}

export const CHANGE_READ_STATUS_USER_NOTIFICATION = 'notification/CHANGE_READ_STATUS_USER_NOTIFICATION' as const;
export const changeReadStatusUserNotificationAction = createAction<IChangeReadStatusUserNotification>(CHANGE_READ_STATUS_USER_NOTIFICATION);

export interface IChangeArchiveStatusUserNotification
{
    id:string;
    status:boolean;
}

export const CHANGE_ARCHIVE_STATUS_USER_NOTIFICATION = 'notification/CHANGE_ARCHIVE_STATUS_USER_NOTIFICATION' as const;
export const changeArchiveStatusUserNotificationAction = createAction<IChangeArchiveStatusUserNotification>(CHANGE_ARCHIVE_STATUS_USER_NOTIFICATION);