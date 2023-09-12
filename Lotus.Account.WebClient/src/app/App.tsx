import * as React from 'react';
import { Route, Routes  } from 'react-router-dom';
import { AboutPage, HomePage } from 'src/pages/Base';
import { AutoLoginPage, LoginPage, RegisterPage, RestorePasswordPage } from 'src/pages/Auth';
import { UserNotificationsPage, UserProfilePage, UserSettingsPage } from 'src/pages/Account';
import { UserGroupsPage, UserPermissionsPage, UserPositionsPage, UserRolesPage, UsersPage } from 'src/pages/Admin';
import { routes } from './routes';
import { MainLayout } from './layout/ui';
import { useScreenTypeChanged } from './layout';
import { MainLayoutPermission } from './layout/ui/MainLayoutPermission';

export const App: React.FC = () => 
{
  useScreenTypeChanged();

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Общие */}
        <Route 
          path={routes.home.path} 
          element={<MainLayout page={<HomePage/>}/>}/>
        <Route 
          path={routes.about.path} 
          element={<MainLayout page={<AboutPage/>}/>}/>          

        {/* Авторизация и регистрация */}
        <Route
          path={routes.login.path}
          element={<LoginPage pathSuccess={routes.home.path} />}/>
        <Route
          path={routes.autoLogin.path}
          element={<AutoLoginPage pathSuccess={routes.home.path} />}/> 
        <Route
          path={routes.register.path}
          element={<RegisterPage pathSuccess={routes.login.path} />}/>
        <Route
          path={routes.restorePassword.path}
          element={<RestorePasswordPage pathSuccess={routes.login.path} />}/>                 

        {/* Личные страницы */}
        <Route 
          path={routes.userProfile.path} 
          element={<MainLayoutPermission {...routes.userProfile} page={<UserProfilePage />} />}/>
        <Route 
          path={routes.userNotifications.path} 
          element={<MainLayoutPermission {...routes.userNotifications} page={<UserNotificationsPage/>}/>}/>
        <Route 
          path={routes.userSettings.path} 
          element={<MainLayoutPermission {...routes.userSettings} page={<UserSettingsPage/>}/>}/>

        {/* Управление */}
        <Route 
          path={routes.users.path} 
          element={<MainLayoutPermission {...routes.users} page={<UsersPage/>}/>}/>

        <Route 
          path={routes.userRoles.path} 
          element={<MainLayoutPermission {...routes.userRoles} page={<UserRolesPage/>}/>}/>

        <Route 
          path={routes.userPermissions.path} 
          element={<MainLayoutPermission {...routes.userPermissions} page={<UserPermissionsPage/>}/>}/> 

        <Route 
          path={routes.userPositions.path} 
          element={<MainLayoutPermission {...routes.userPositions} page={<UserPositionsPage/>}/>}/> 

        <Route 
          path={routes.userGroups.path} 
          element={<MainLayoutPermission {...routes.userGroups} page={<UserGroupsPage/>}/>}/> 
      </Routes>
    </React.Suspense>
  );
};

