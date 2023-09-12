import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthService, TokenHelper } from 'src/modules/auth';
import { localization } from 'src/resources/localization';
import { routes } from './routes';

interface IRouteUserPermissionProps 
{
  /**
   * Компонент для отображения в случае успешного доступа
   */
  component: ReactElement;

  /**
   * Компонент для отображения в случае недостаточности прав
   */
  accessDenied?: ReactElement;

  /**
   * Набор разрешений для доступа по данному маршруту
   */
  permissions?: string[];

  /**
   * Должен ли он быть пользователь авторизован для доступа по данному маршруту
   */
  isShouldBeAuthorized?: boolean;
};

export const RoutePermission = (props: IRouteUserPermissionProps): ReactElement => 
{
  const {component, accessDenied, permissions, isShouldBeAuthorized} = props;

  const isAuth = TokenHelper.isAccessToken();
  const isAuthCookie = AuthService.IsAuthCookie();

  const location = useLocation();

  const state = location.state as { from: Location };
  const prevPageUrl = state ? state.from.pathname : '/';

  // Пользователь должен быть авторизован
  if(isShouldBeAuthorized)
  {
    // Если он авторизован
    if(isAuth)
    {
      // Если нужен доступ
      if(permissions)
      {
        // Проверяем права
        if (TokenHelper.checkUserPermissions(permissions)) 
        {
          // Права нужные есть
          return component;
        }
        else
        {
          // Доступа нет, возвращаем страницу профиля
          return accessDenied ?? <>{localization.auth.accessDenied}</>;
        }
      }
      else
      {
        // Доступ к ресурсу не нужен
        return component;
      }
    }
    else
    {
      if(isAuthCookie)
      {
        // Пользователь не авторизован - Но есть куки
        return <Navigate to={routes.autoLogin.path} state={{ from: location }} />
      }
      else
      {
        // Пользователь не авторизован - возвращаем страницу авторизации
        return <Navigate to={routes.login.path} state={{ from: location }} />
      }
    }
  }
  else
  {
    // Он авторизован, но не должен быть
    if(isAuth)
    {
      // Переходим на предыдущую страницу
      return <Navigate to={prevPageUrl} state={{ from: location }} />
    }
    else
    {
      return component;
    }
  }
}
