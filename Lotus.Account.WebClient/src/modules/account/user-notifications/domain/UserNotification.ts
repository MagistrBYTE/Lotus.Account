import { IGrouping } from 'src/shared/types/Grouping';
import { TUserNotificationImportance } from './UserNotificationImportance';

/**
 * Уведомление
 */
export interface IUserNotification
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
  importance?: TUserNotificationImportance;

  /**
   * Содержание
   */
  content: string;

  /** Дата 
   *
   */
  created: string;

  /**
   * Статус прочтения уведомления
   */
  isRead: boolean;

  /** 
   * Статус нахождения уведомления в архиве 
   */
  isArchive: boolean;
}

/**
 * Группирование уведомлений
 */
export interface IUserNotificationGroup extends IGrouping<IUserNotification>
{

}
