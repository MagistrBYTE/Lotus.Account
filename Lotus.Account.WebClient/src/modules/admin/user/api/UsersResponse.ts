import { IResponsePage } from 'src/shared/types/Response';
import { IUser } from '../domain/User';

export interface IUsersResponse extends IResponsePage<IUser>
{
}