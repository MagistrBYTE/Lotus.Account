import * as React from 'react';
import { Route, Routes  } from 'react-router-dom';
import { GroupsPage } from 'src/modules/group';
import { PermissionsPage } from 'src/modules/permission';
import { PositionsPage } from 'src/modules/position';
import { RolesPage } from 'src/modules/role';
import { UsersPage } from 'src/modules/user';
import { LoginPage, AutoLoginPage, RegisterPage, RestorePasswordPage, authNavigation } from 'src/shared/auth';
import { useScreenTypeChanged } from 'src/shared/layout';
import { accountNavigation } from 'src/shared/account/accountNavigation';
import { MainLayoutPermission } from 'src/shared/layout/ui/MainLayoutPermission';
import { ProfilePage, NotificationsPage, ConfigurationPage } from 'src/shared/account';
import { MainLayout } from 'src/shared/layout/ui';
import { DummyPage } from './DummyPage';
import { HomePage } from './HomePage';
import { mainNavigations } from './mainNavigations';

export const App: React.FC = () => 
{
  useScreenTypeChanged();

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route 
          path={mainNavigations.home.path} 
          element={<MainLayout page={<HomePage/>}/>}/>

        {/* Авторизация и регистрация */}
        <Route
          path={authNavigation.login.path}
          element={<LoginPage pathSuccess={accountNavigation.profile.path} />}/>
        <Route
          path={authNavigation.autoLogin.path}
          element={<AutoLoginPage pathSuccess={accountNavigation.profile.path} />}/> 
        <Route
          path={authNavigation.registr.path}
          element={<RegisterPage pathSuccess={authNavigation.login.path} />}/>
        <Route
          path={authNavigation.restorePassword.path}
          element={<RestorePasswordPage pathSuccess={authNavigation.login.path} />}/>                 

        {/* Личные страницы */}
        <Route 
          path={accountNavigation.profile.path} 
          element={<MainLayoutPermission {...accountNavigation.profile}  page={<ProfilePage />} />}/>
        <Route 
          path={accountNavigation.notification.path} 
          element={<MainLayoutPermission {...accountNavigation.notification} page={<NotificationsPage/>}/>}/>
        <Route 
          path={accountNavigation.configuration.path} 
          element={<MainLayoutPermission {...accountNavigation.configuration} page={<ConfigurationPage/>}/>}/>

        {/* Управление */}
        <Route 
          path={mainNavigations.users.path} 
          element={<MainLayoutPermission {...mainNavigations.users} page={<UsersPage/>}/>}/>

        <Route 
          path={mainNavigations.roles.path} 
          element={<MainLayoutPermission {...mainNavigations.roles} page={<RolesPage/>}/>}/>

        <Route 
          path={mainNavigations.permissions.path} 
          element={<MainLayoutPermission {...mainNavigations.permissions} page={<PermissionsPage/>}/>}/> 

        <Route 
          path={mainNavigations.groups.path} 
          element={<MainLayoutPermission {...mainNavigations.groups} page={<GroupsPage/>}/>}/> 

        <Route 
          path={mainNavigations.positions.path} 
          element={<MainLayoutPermission {...mainNavigations.positions} page={<PositionsPage/>}/>}/> 

        {/* Разное */}
        <Route 
          path={mainNavigations.dummy.path} 
          element={<DummyPage/>}/>
      </Routes>
    </React.Suspense>
  );
};

