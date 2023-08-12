import { TNotificationImportance } from '../domain/NotificationImportance';

export interface INotificationCreateRequest
{
    /** Тема уведомления */
    topic?: string;

    /** Источник уведомления */
    sender?: string;

    /** Важность уведомления */
    importance?: TNotificationImportance;

    /** Содержание уведомления */
    content: string;

    /** Статус прочитания уведомления */
    isRead: boolean;

    /** Статус нахождения уведомления в архиве */
    isArchive: boolean;
}