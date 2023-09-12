import { IUser } from '../domain/User';

export const mockUserData:IUser[] = 
[
  {
    id: 'id',
    login: 'login',
    emailConfirmed: false,
    name: 'Федор',
    surname: 'Федоров',
    patronymic: 'Иванович',
    roleId: 3
  },
  {
    id: 'id',
    login: 'login',
    emailConfirmed: false,
    name: 'Иванов',
    surname: 'Иван',
    patronymic: 'Федорович',
    roleId: 3
  }  
] 


