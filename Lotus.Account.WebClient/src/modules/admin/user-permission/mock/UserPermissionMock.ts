import { IUserPermission } from '../domain/UserPermission';

export const mockUserPermissions:IUserPermission[] = 
[
  {
    id: 1,
    name: 'admin',
    displayName: 'Администрирование системы',
    isConst: true
  },
  {
    id: 2,
    name: 'editor',
    displayName: 'Модератор'
  }, 
  {
    id: 3,
    name: 'user',
    displayName: 'Пользователь'
  }
] 