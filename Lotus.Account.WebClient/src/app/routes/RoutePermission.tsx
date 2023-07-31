import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProfilePage } from 'src/modules/profile';
import { TokenHelper } from 'src/shared/auth/TokenHelper';
import { AuthApi } from 'src/shared/auth/AuthApiService';
import { MainLayout } from 'src/shared/layout';
import { paths } from './paths';

interface IRoutePermissionProps {
  children: React.ReactElement;
  permissions?: string[];
  isShouldBeAuthorized?: boolean;
};

export const RoutePermission = ({ children, permissions = undefined,
  isShouldBeAuthorized = true }: IRoutePermissionProps): React.ReactElement | null => 
{
  const isAuth = TokenHelper.isAccessToken();
  const isAuthCookie = AuthApi.IsAuthCookie();
  const location = useLocation();
  const state = location.state as { from: Location };
  const prevPageUrl = state ? state.from.pathname : paths.home();

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
          // Права нужне есть
          return children;
        }
        else
        {
          // Доступа нет, возвращаем страницу профиля
          return <MainLayout page={<ProfilePage/>}/>
        }
      }
      else
      {
        // Доступ к ресурсу не нужен
        return children;
      }
    }
    else
    {
      if(isAuthCookie)
      {
        // Пользователь не авторизован - Но есть куки
        return <Navigate to={paths.autoLogin()} state={{ from: location }} />
      }
      else
      {
        // Пользователь не авторизован - возвращаем страницу авторизации
        return <Navigate to={paths.login()} state={{ from: location }} />
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
      return children;
    }
  }
}
