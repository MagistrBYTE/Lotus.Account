import { TColorType } from 'src/ui/types/ColorTypes';
import { localization } from 'src/resources/localization';
import { IUserNotificationImportanceDesc, TUserNotificationImportance, UserNotificationImportanceEnum } from '../domain/UserNotificationImportance';

export class UserNotificationImportanceHelper
{
  public static getDesc(notification: TUserNotificationImportance):IUserNotificationImportanceDesc
  {
    switch(notification)
    {
      case 'Importance': return UserNotificationImportanceEnum.Importance;
      case 'Normal': return UserNotificationImportanceEnum.Normal;
      case 'Service': return UserNotificationImportanceEnum.Service;
    }

    return UserNotificationImportanceEnum.Normal;
  }

  public static getType(notification: IUserNotificationImportanceDesc):TUserNotificationImportance
  {
    switch(notification)
    {
      case UserNotificationImportanceEnum.Importance: return 'Importance';
      case UserNotificationImportanceEnum.Normal: return 'Normal';
      case UserNotificationImportanceEnum.Service: return 'Service';
    }

    return 'Normal';
  }
  
  public static convertToColor = (importance: TUserNotificationImportance|undefined):TColorType =>
  {
    if(!importance) return 'default';
  
    switch(importance)
    {
      case 'Importance': return 'error';
      case 'Normal': return 'default';
      case 'Service': return 'primary';
    }
  
    return 'default';
  }
  
  public static convertToText = (importance: TUserNotificationImportance|undefined):string =>
  {
    if(!importance) return '';
  
    switch(importance)
    {
      case 'Importance': return localization.notification.importanceChief;
      case 'Normal': return localization.notification.importanceNormal;
      case 'Service': return localization.notification.importanceService;
    }
  
    return '';
  }  
}