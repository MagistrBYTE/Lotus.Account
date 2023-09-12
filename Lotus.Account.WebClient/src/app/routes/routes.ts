import { IRoute, Route } from 'src/shared/types/Route';

/**
 * Маршруты
 */
export const routes = {
  
  //
  // ОБЩИЕ
  //  
  home: new Route('/'),

  /**
   * Информация об приложении
   */      
  about: new Route('/about'),  

  //
  // АВТОРИЗАЦИЯ И РЕГИСТРАЦИЯ
  //
  /**
   * Вход
   */    
  login: new Route('/auth/login'),

  /**
   * Автоматический вход на сайт
   */    
  autoLogin: new Route('/auth/autoLogin'),

  /**
   * Зарегистрироваться
   */   
  register: new Route('/auth/register'),

  /**
   * Восстановить пароль
   */  
  restorePassword: new Route('/auth/restorePassword'),

  //
  // АККАУНТ ПОЛЬЗОВАТЕЛЯ
  //
  /**
   * Профиль пользователя
   */  
  userProfile: new Route('/account/profile', true),

  /**
   * Настройки пользователя
   */  
  userSettings: new Route('/account/settings', true), 
  
  /**
   * Уведомления пользователя
   */  
  userNotifications: new Route('/account/notifications', true),

  //
  // УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
  //
  /**
   * Управление пользователями
   */  
  users: new Route('/users', true),

  /**
   * Управление ролями
   */  
  userRoles: new Route('/user/roles', true),

  /**
   * Управление разрешениями
   */  
  userPermissions: new Route('/user/permissions', true),

  /**
   * Управление должностями
   */  
  userPositions: new Route('/user/positions', true),   
  
  /**
   * Управление группами
   */  
  userGroups: new Route('/user/groups', true)

} satisfies Record<string, IRoute>;

/**
   * Проверка маршрута на что ему требуется авторизация
   */
export const checkRouteAuth = (uri:string):boolean =>
{
  let find = false;
  for(const key in routes)
  {
    // @ts-ignore
    const route = routes[key] as IRoute;
    if(find === false)
    {
      if(uri.includes(route.path))
      {
        find = route.isShouldBeAuthorized ?? false;
      }
    }
  }
  return find;
} 