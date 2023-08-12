import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { localization } from '../localization';
import { INavigationPath } from '../navigation';

/**
 * Глобальный доступ к навигации связанной с авторизацией и регистрацией пользователя 
 */
export const authNavigation: 
{
  login: INavigationPath,
  autoLogin: INavigationPath,
  registr: INavigationPath,
  restorePassword: INavigationPath,
  logout: INavigationPath,
} = 
{
  /**
   * Вход
   */  
  login:
  {
    label: localization.auth.entrance,
    path: '/auth/login',
    group: 'auth'
  } as const,

  /**
   * Автоматический вход на сайт
   */
  autoLogin: 
  {
    label: localization.auth.autoComeIn,
    path: '/auth/autoLogin',
    group: 'auth'
  } as const,

  /**
   * Зарегистрироваться
   */
  registr:
  {
    label: localization.auth.register,
    path: '/auth/registr',
    group: 'auth'
  } as const,   
  
  /**
   * Восстановить пароль
   */
  restorePassword:
  {
    label: localization.auth.restorePassword,
    path: '/auth/restorePassword',
    group: 'auth'
  } as const,

  /**
   * Выход
   */
  logout:
  {
    icon: <LogoutIcon />,
    label: localization.auth.logout,
    path: '',
    group: 'auth'
  } as const    
}; 