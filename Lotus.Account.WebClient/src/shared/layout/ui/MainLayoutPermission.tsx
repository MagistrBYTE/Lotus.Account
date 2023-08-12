import * as React from 'react';
import { INavigationPath } from 'src/shared/navigation';
import { AuthApi, TokenHelper, authNavigation } from 'src/shared/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { ProfilePage } from 'src/shared/account';
import { MainLayout } from './MainLayout';

export interface IMainLayoutPermissionProps extends INavigationPath
{
  page: React.ReactElement | null;
}

export const MainLayoutPermission: React.FC<IMainLayoutPermissionProps> = (props:IMainLayoutPermissionProps) => 
{
  const {page, isShouldBeAuthorized, permissions, path} = props;

  const isAuth = TokenHelper.isAccessToken();
  const isAuthCookie = AuthApi.IsAuthCookie();

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
          return <MainLayout page={page}/>
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
        return <MainLayout page={page}/>
      }
    }
    else
    {
      if(isAuthCookie)
      {
        // Пользователь не авторизован - Но есть куки
        return <Navigate to={authNavigation.autoLogin.path} state={{ from: location }} />
      }
      else
      {
        // Пользователь не авторизован - возвращаем страницу авторизации
        return <Navigate to={authNavigation.login.path} state={{ from: location }} />
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
      return <MainLayout page={page}/>
    }
  }
};
