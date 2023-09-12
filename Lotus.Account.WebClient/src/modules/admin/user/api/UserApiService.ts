import { AuthApiService } from 'src/modules/auth';
import { IUser } from '../domain/User';
import { mockUserData } from '../mock/UserMock';
import { IUserCreateRequest } from './UserCreateRequest';
import { IUsersRequest } from './UsersRequest';
import { IUsersResponse } from './UsersResponse';
import { IUserResponse } from './UserResponse';

/**
 * Api для работы с пользователем 
 */
class UserApiService extends AuthApiService 
{
  private static _UserApi: UserApiService;

  public static override get Instance(): UserApiService 
  {
    return (this._UserApi || (this._UserApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserAsync = this.createUserAsync.bind(this);
    this.updateUserAsync = this.updateUserAsync.bind(this);
    this.getUserAsync = this.getUserAsync.bind(this);  
    this.getUsersAsync = this.getUsersAsync.bind(this);
    this.removeUserAsync = this.removeUserAsync.bind(this);
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

  public async getUsersAsync(filter: IUsersRequest):Promise<IUsersResponse>
  {
    const url = 'connect/token';

    const response = await this.get<IUsersResponse>(url);
    return response.data;
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
}

/**
 * Глобальный экземпляр для доступа к Api для работы с пользователем 
 */
export const UserApi = UserApiService.Instance;