import { ApiService } from 'src/core/api/ApiService';
import { IUser } from '../domain/User';
import { mockUserData } from '../mock/UserMock';
import { IUserCreateRequest } from './UserCreateRequest';
import { IUsersRequest } from './UsersRequest';
import { IUsersResponse } from './UsersResponse';
import { IUserResponse } from './UserResponse';

/**
 * Api для работы с пользователем 
 */
class UserApiService extends ApiService 
{
  private static _UserApi: UserApiService;

  public static get Instance(): UserApiService 
  {
    return (this._UserApi || (this._UserApi = new this()));
  }

  public async createUserAsync(registerParams: IUserCreateRequest):Promise<IUserResponse> 
  {
    const url = 'connect/token';

    const response = await this.post<IUserResponse, IUserCreateRequest>(url, registerParams);
    return response.data;

    // return new Promise<IUser>((resolve)=>
    // {
    //   setTimeout(() => resolve(mockUserData[0]), 500)
    // });
  }

  public async getUserAsync(id: string):Promise<IUser> 
  {
    const url = 'connect/token';

    const response = await this.get<IUser>(url);
    return response.data;

    return new Promise<IUser>((resolve)=>
    {
      setTimeout(() => resolve(mockUserData[0]), 500)
    });
  }    

  public async updateUserAsync(updatedUser: IUser):Promise<IUser> 
  {
    const url = 'connect/token';

    const response = await this.put<IUser, IUser>(url, updatedUser);
    return response.data;

    return new Promise<IUser>((resolve)=>
    {
      setTimeout(() => resolve(mockUserData[0]), 500)
    });
  } 

  public async removeUserAsync(id: string):Promise<boolean> 
  {
    const url = 'connect/token';

    const response = await this.delete<boolean>(url);
    return response.data;

    return new Promise<boolean>((resolve)=>
    {
      setTimeout(() => resolve(false), 500)
    });
  }    

  public async getUsersAsync(filter: IUsersRequest):Promise<IUsersResponse>
  {
    const url = 'connect/token';

    const response = await this.get<IUsersResponse>(url);
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с пользователем 
 */
export const UserApi = UserApiService.Instance;