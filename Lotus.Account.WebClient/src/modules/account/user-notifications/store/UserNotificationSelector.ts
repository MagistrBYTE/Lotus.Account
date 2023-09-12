import { RootState, useAppSelector } from 'src/app/store';
import { IUserNotificationState } from './UserNotificationState';

export const useUserNotificationState = ():IUserNotificationState =>
{
  return useAppSelector((state: RootState) => state.userNotification);
}
