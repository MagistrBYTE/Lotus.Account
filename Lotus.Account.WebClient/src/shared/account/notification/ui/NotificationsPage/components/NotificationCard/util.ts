import { TNotificationImportance } from 'src/shared/account/notification/domain/NotificationImportance';
import { localization } from 'src/shared/localization';
import { TColorType } from 'src/ui/types/ColorTypes';

export const convertNotificationImportanceToColor = (importance: TNotificationImportance|undefined):TColorType =>
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

export const convertNotificationImportanceToText = (importance: TNotificationImportance|undefined):string =>
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