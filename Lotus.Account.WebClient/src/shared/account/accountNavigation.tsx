import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { INavigationPath } from '../navigation';
import { localization } from '../localization';

/**
 * Глобальный доступ к навигации связанной с аккаунтом пользователя 
 */
export const accountNavigation: 
{
  account: INavigationPath,
  profile: INavigationPath,
  configuration: INavigationPath,
  notification: INavigationPath
} = 
{
  /**
   * Аккаунт
   */  
  account:
  {
    icon: <AccountCircle/>,
    label: 'Аккаунт',
    path: '',
    group: 'account'
  } as const,
 
  /**
  * Профиль
  */
  profile:
  {
    icon: <PersonIcon/>,
    label: localization.profile.profile,
    isShouldBeAuthorized: true,
    path: '/account/profile',
    group: 'account'
  } as const,
 
  /**
  * Конфигурация
  */
  configuration:
  {
    icon: <SettingsIcon/>,
    label: localization.configuration.configuration,
    isShouldBeAuthorized: true,
    path: '/account/configuration',
    group: 'account'
  } as const,  

  /**
  * Уведомления
  */
  notification:
  {
    icon: <NotificationsIcon/>,
    label: localization.notification.notification,
    isShouldBeAuthorized: true,
    path: '/account/notifications',
    group: 'account'
  } as const 
}; 