import { IRole } from '../domain/Role';

export const mockRoles:IRole[] = 
[
  {
    id: 1,
    systemName: 'admin',
    dispalyName: 'Администрирование системы',
    isConst: true,
    permissionIds: []
  },
  {
    id: 2,
    systemName: 'editor',
    dispalyName: 'Модератор',
    permissionIds: []
  }, 
  {
    id: 3,
    systemName: 'user',
    dispalyName: 'Пользователь',
    permissionIds: []
  }
] 