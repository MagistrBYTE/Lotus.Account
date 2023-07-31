import { RootState, useAppSelector } from 'src/app/store';
import { INotificationState } from './NotificationState';

export const useNotificationState = ():INotificationState =>
{
  return useAppSelector((state: RootState) => state.notification);
}
