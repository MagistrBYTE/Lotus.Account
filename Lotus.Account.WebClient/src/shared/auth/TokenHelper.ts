import jwt_decode from 'jwt-decode';
import { TokenItemEnum } from './TokenItem';
import { ISuccessAuthResponse } from './SuccessAuthResponse';

const storage = window.localStorage;

export const TokenHelper = {

  setData(data: ISuccessAuthResponse) 
  {
    storage.setItem(TokenItemEnum.AccessToken, data.access_token); 
    storage.setItem(TokenItemEnum.RefreshToken, data.refresh_token); 

    const tokenItems = jwt_decode(data.access_token) as any;

    const expToken = tokenItems.exp;
    storage.setItem(TokenItemEnum.ExpiresIn, expToken);

    const userId = tokenItems.sub;
    storage.setItem(TokenItemEnum.UserId, userId);

    const userLogin = tokenItems.name;
    storage.setItem(TokenItemEnum.UserLogin, userLogin);

    const userRole = tokenItems.role;
    storage.setItem(TokenItemEnum.UserRole, userRole);

    const userName = tokenItems.user_name;
    storage.setItem(TokenItemEnum.UserName, userName);

    const userSurname = tokenItems.user_surname;
    storage.setItem(TokenItemEnum.UserSurname, userSurname);

    const userFathersname = tokenItems.user_fathersname;
    storage.setItem(TokenItemEnum.UserFathersname, userFathersname);

    const userPosition = tokenItems.user_position;
    storage.setItem(TokenItemEnum.UserPosition, userPosition);

    const userGroup = tokenItems.user_group;
    storage.setItem(TokenItemEnum.UserGroup, userGroup);

    const userPermissions = tokenItems.user_permissions;
    storage.setItem(TokenItemEnum.UserPermissions, userPermissions);
  },

  getAccessToken(): string | null
  {
    return storage.getItem(TokenItemEnum.AccessToken);
  },

  getRefreshToken(): string | null
  {
    return storage.getItem(TokenItemEnum.RefreshToken);
  }, 

  getExpiresIn(): number
  {
    return Number(storage.getItem(TokenItemEnum.ExpiresIn));
  },  

  isAccessToken(): boolean
  {
    const token = storage.getItem(TokenItemEnum.AccessToken);
    if(token)
    {
      return true;
    }

    return false;
  },

  clearAccessToken() 
  {
    storage.removeItem(TokenItemEnum.AccessToken);
    storage.removeItem(TokenItemEnum.ExpiresIn);
    storage.removeItem(TokenItemEnum.RefreshToken);      
    storage.removeItem(TokenItemEnum.UserId);
    storage.removeItem(TokenItemEnum.UserLogin);
    storage.removeItem(TokenItemEnum.UserName);
    storage.removeItem(TokenItemEnum.UserSurname);
    storage.removeItem(TokenItemEnum.UserFathersname);
    storage.removeItem(TokenItemEnum.UserRole);
    storage.removeItem(TokenItemEnum.UserPosition);
    storage.removeItem(TokenItemEnum.UserGroup);
    storage.removeItem(TokenItemEnum.UserPermissions);
  },

  getUserId(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserId);
  },

  getUserLogin(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserLogin);
  },

  getUserName(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserName);
  },

  getUserSurname(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserSurname);
  },

  getUserFathersName(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserFathersname);
  },

  getCurrentUserFio(): string | null 
  {
    return `${this.getUserSurname()} ${this.getUserName()} ${this.getUserFathersName()}`;
  },

  getUserRole(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserRole);
  },

  getUserPosition(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserPosition);
  },

  getUserGroup(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserGroup);
  },

  getUserPermissions(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserPermissions);
  },

  checkUserPermission(permission: string): boolean 
  {
    const accesPermissions = storage.getItem(TokenItemEnum.UserPermissions);
    if(accesPermissions)
    {
      return accesPermissions.includes(permission);
    }
    return false;
  },

  checkUserPermissions(permissions: string[]|undefined): boolean 
  {
    if(permissions === undefined) return true;

    const accesPermissions = storage.getItem(TokenItemEnum.UserPermissions);
    if(accesPermissions)
    {
      for (let index = 0; index < permissions.length; index++) 
      {
        const permission = permissions[index];
        const exist = accesPermissions.includes(permission)
        if(exist)
        {
          return true;
        }
      }
    }
    return false;
  }
};
