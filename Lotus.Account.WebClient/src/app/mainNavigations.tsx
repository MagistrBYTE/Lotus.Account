import PeopleIcon from '@mui/icons-material/People';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import GroupIcon from '@mui/icons-material/Group';
import ApprovalIcon from '@mui/icons-material/Approval';
import { localization } from 'src/shared/localization';
import React from 'react';
import { INavigationPath } from 'src/shared/navigation';

export const mainNavigations: 
{
  home: INavigationPath,
  dummy: INavigationPath,

  users: INavigationPath,
  roles: INavigationPath,
  permissions: INavigationPath,
  groups: INavigationPath,
  positions: INavigationPath,
} = 
{
  /**
   * Домашняя страница
   */
  home: 
  {
    label: '',
    path: '/',
    group: 'home' 
  } as const,   

  /**
   * Пустышка
   */
  dummy: 
  {
    label: 'Пустышка',
    path: '/dummy',
    group: 'dummy' 
  } as const,   

  /**
   * Пользователи
   */
  users:
  {
    icon: <PeopleIcon/>,
    label: localization.user.users,
    isShouldBeAuthorized: true,
    path: '/users',
    group: 'main'    
  } as const,

  /**
   * Роли
   */
  roles:
  {
    icon: <WorkspacePremiumIcon/>,
    label: localization.role.roles,
    isShouldBeAuthorized: true,
    path: '/roles',  
    group: 'main' 
  } as const,

  /**
   * Разрешения
   */  
  permissions:
  {
    icon: <PermDeviceInformationIcon/>,
    label: localization.permission.permissions,
    isShouldBeAuthorized: true,
    path: '/permissions',  
    group: 'main'  
  } as const,

  /**
   * Группы
   */  
  groups:
  {
    icon: <GroupIcon/>,
    label: localization.group.groups,
    isShouldBeAuthorized: true,
    path: '/groups',  
    group: 'main'  
  } as const,

  /**
   * Должности
   */  
  positions:
  {
    icon: <ApprovalIcon/>,
    label: localization.position.positions,
    isShouldBeAuthorized: true,
    path: '/positions',  
    group: 'main'  
  } as const  
}; 