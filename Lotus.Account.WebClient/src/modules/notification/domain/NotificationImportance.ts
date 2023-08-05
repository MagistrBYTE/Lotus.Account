import { localization } from 'src/shared/localization'

/**
 * Важность уведомления
 */
export interface INotificationImportanceDesc
{
  id: number,
  name: string,  
}

export const NotificationImportanceEnum =
{
  /**
   * Важное
   */
  Importance:
  {
    id: 1,
    name: localization.notification.importanceChief
  },

  /**
   * Обычное
   */
  Normal: 
  {
    id: 2,
    name: localization.notification.importanceNormal
  },

  /**
   * Служебное
   */
  Service: 
  {
    id: 3,
    name: localization.notification.importanceService
  }
} as const

/**
 * Тип уведомления
 */
export type TNotificationImportance = keyof typeof NotificationImportanceEnum;

export const NotificationImportanceHelper =
{
  getDesc(notification: TNotificationImportance):INotificationImportanceDesc
  {
    switch(notification)
    {
      case 'Importance': return NotificationImportanceEnum.Importance;
      case 'Normal': return NotificationImportanceEnum.Normal;
      case 'Service': return NotificationImportanceEnum.Service;
    }

    return NotificationImportanceEnum.Normal;
  },

  getType(notification: INotificationImportanceDesc):TNotificationImportance
  {
    switch(notification)
    {
      case NotificationImportanceEnum.Importance: return 'Importance';
      case NotificationImportanceEnum.Normal: return 'Normal';
      case NotificationImportanceEnum.Service: return 'Service';
    }

    return 'Normal';
  }  
}