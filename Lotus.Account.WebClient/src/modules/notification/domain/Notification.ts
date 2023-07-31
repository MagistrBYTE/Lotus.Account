import { TNotificationImportance } from './NotificationImportance';

/**
 * Уведомление
 */
export interface INotification
{
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Тема
   */
  topic?: string;

  /**
   * Источник
   */
  sender?: string;

  /**
   * Важность
   */
  importance?: TNotificationImportance;

  /**
   * Содержание
   */
  content: string;

  /** Дата */
  created: Date;

  /**
   * Статус прочитки
   */
  isRead: boolean;

  /** Статус нахождения уведомления в архиве */
  isArchive: boolean;
}