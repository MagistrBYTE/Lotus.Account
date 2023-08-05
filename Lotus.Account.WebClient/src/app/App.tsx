import * as React from 'react';
import { Route, Routes  } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { ProfilePage } from 'src/modules/profile';
import { GroupsPage } from 'src/modules/group';
import { NotificationsPage } from 'src/modules/notification';
import { PermissionsPage } from 'src/modules/permission';
import { PositionsPage } from 'src/modules/position';
import { RolesPage } from 'src/modules/role';
import { UsersPage } from 'src/modules/user';
import { LoginPage, AutoLoginPage, RegisterPage, RestorePasswordPage } from 'src/shared/auth';
import { ConfigurationPage } from 'src/modules/configuration';
import { TScreenType } from 'src/shared/layout';
import { setScreenTypeAction } from 'src/shared/layout/store/LayoutActions';
import { DummyPage } from './DummyPage';
import { HomePage } from './HomePage';
import { RoutePermission } from './routes/RoutePermission';
import { paths } from './routes/paths';
import { useAppDispatch } from './store';
import { MainLayout } from './layout';


export const App: React.FC = () => 
{
  const isDesktopQuery = '(min-width: 1280px)';
  const isPortraitQuery = '(orientation: portrait)';

  const dispacth = useAppDispatch();
  
  const handleScreenTypeChange = () =>
  {
    const isDesktop = window.matchMedia(isDesktopQuery).matches;
    const isPortrait = window.matchMedia(isPortraitQuery).matches;

    if(isPortrait)
    {
      dispacth(setScreenTypeAction(TScreenType.Portrait)); 
    }
    else
    {
      if(isDesktop)
      {
        dispacth(setScreenTypeAction(TScreenType.Desktop));
      }
      else
      {
        dispacth(setScreenTypeAction(TScreenType.Landscape));
      }
    }
  }

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenTypeChange);
    window.addEventListener('orientationchange', handleScreenTypeChange);

    return () => 
    {
      window.removeEventListener('resize', handleScreenTypeChange);
      window.removeEventListener('orientationchange', handleScreenTypeChange);
    };
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route 
          path={paths.home()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<HomePage/>}/>}/>}/>

        {/* Авторизация и регистрация */}
        <Route
          path={paths.login()}
          element={<LoginPage pathSuccess={paths.profile()} />}/>
        <Route
          path={paths.autoLogin()}
          element={<AutoLoginPage pathSuccess={paths.profile()} />}/> 
        <Route
          path={paths.register()}
          element={<RegisterPage pathSuccess={paths.login()} />}/>
        <Route
          path={paths.restorePassword()}
          element={<RestorePasswordPage pathSuccess={paths.login()} />}/>                 

        {/* Личные страницы */}
        <Route 
          path={paths.profile()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<ProfilePage/>}/>}/>}/>
        <Route 
          path={paths.notifications()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<NotificationsPage/>}/>}/>}/>
        <Route 
          path={paths.configuration()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<ConfigurationPage/>}/>}/>}/>

        {/* Управление */}
        <Route 
          path={paths.users()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<UsersPage/>}/>}/>}/>

        <Route 
          path={paths.roles()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<RolesPage/>}/>}/>}/>

        <Route 
          path={paths.permissions()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<PermissionsPage/>}/>}/>}/> 

        <Route 
          path={paths.groups()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<GroupsPage/>}/>}/>}/> 

        <Route 
          path={paths.positions()} 
          element={<RoutePermission isShouldBeAuthorized children={<MainLayout page={<PositionsPage/>}/>}/>}/> 

        {/* Разное */}
        <Route 
          path={paths.dummy()} 
          element={<DummyPage/>}/>
      </Routes>
    </React.Suspense>
  );
};

