import { TUserNotificationImportance } from '../domain/UserNotificationImportance';

export interface IUserNotificationCreateRequest
{
    /** 
     * Тема уведомления
     */
    topic?: string;

    /** 
     * Источник уведомления
    */
    sender?: string;

    /** 
     * Важность уведомления
     */
    importance?: TUserNotificationImportance;

    /** 
     * Содержание уведомления
     */
    content: string;

    /** 
     * Статус прочтения уведомления
     */
    isRead: boolean;

    /** 
     * Статус нахождения уведомления в архиве 
     */
    isArchive: boolean;
}