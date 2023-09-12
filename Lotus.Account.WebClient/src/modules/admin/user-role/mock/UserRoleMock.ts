import { IUserRole } from '../domain/UserRole';

export const mockUserRoles:IUserRole[] = 
[
  {
    id: 1,
    name: 'admin',
    displayName: 'Администрирование системы',
    isConst: true,
    permissionIds: []
  },
  {
    id: 2,
    name: 'editor',
    displayName: 'Модератор',
    permissionIds: []
  }, 
  {
    id: 3,
    name: 'user',
    displayName: 'Пользователь',
    permissionIds: []
  }
] 