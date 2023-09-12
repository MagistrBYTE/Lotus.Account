import { localization } from 'src/resources/localization';

/**
 * Важность уведомления
 */
export interface IUserNotificationImportanceDesc
{
  id: number,
  name: string,  
}

export const UserNotificationImportanceEnum =
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
export type TUserNotificationImportance = keyof typeof UserNotificationImportanceEnum;