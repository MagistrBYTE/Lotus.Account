import { INotification } from './Notification';
import { TNotificationImportance } from './NotificationImportance';

/**
 * Группа уведомлений сгруппированных по ключу
 */
export interface INotificationGroup
{
  /**
   * Ключ группы
   */
  groupKey: string;

  /**
   * Уведомления
   */
  notifications: INotification[]
}