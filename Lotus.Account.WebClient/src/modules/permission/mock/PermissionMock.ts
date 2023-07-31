import { IPermission } from '../domain/Permission';

export const mockPermissions:IPermission[] = 
[
  {
    id: 1,
    systemName: 'admin',
    dispalyName: 'Администрирование системы',
    isConst: true
  },
  {
    id: 2,
    systemName: 'editor',
    dispalyName: 'Модератор'
  }, 
  {
    id: 3,
    systemName: 'user',
    dispalyName: 'Пользователь'
  }
] 