import { IResponsePage } from 'src/core/types/Response';
import { IUser } from '../domain/User';

export interface IUsersResponse extends IResponsePage<IUser>
{
}