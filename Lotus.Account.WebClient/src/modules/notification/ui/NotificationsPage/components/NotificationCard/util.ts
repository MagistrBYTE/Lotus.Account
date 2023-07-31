import { TNotificationImportance } from 'src/modules/notification/domain/NotificationImportance';
import { localization } from 'src/shared/localization';
import { TColorType } from 'src/ui/types/ColorTypes';

export const convertNotificationImportanceToColor = (importance: TNotificationImportance|undefined):TColorType =>
{
  if(!importance) return 'default';

  switch(importance)
  {
    case TNotificationImportance.Importance: return 'error';
    case TNotificationImportance.Normal: return 'default';
    case TNotificationImportance.Service: return 'primary';
  }

  return 'default';
}

export const convertNotificationImportanceToText = (importance: TNotificationImportance|undefined):string =>
{
  if(!importance) return '';

  switch(importance)
  {
    case TNotificationImportance.Importance: return localization.notification.importance;
    case TNotificationImportance.Normal: return localization.notification.importanceNormal;
    case TNotificationImportance.Service: return localization.notification.importanceService;
  }

  return '';
}