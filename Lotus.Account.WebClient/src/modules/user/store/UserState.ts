import { IUsersRequest } from '../api/UsersRequest';
import { IUsersResponse } from '../api/UsersResponse';
import { IUser } from '../domain/User';

export interface IUserState
{
    currentUser?: IUser;
    viewUsers?: IUsersResponse;
    filterViewUsers?: IUsersRequest;
    lastCreateUser?: IUser;
    lastViewUser?: IUser;
    lastUpdateUser?: IUser;
    status?: string;
    isLoading: boolean;
    error?: string;
}
