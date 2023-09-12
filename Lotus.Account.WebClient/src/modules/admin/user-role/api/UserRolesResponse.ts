import { IResponsePage } from 'src/shared/types/Response';
import { IUserRole } from '../domain/UserRole';

export interface IUserRolesResponse extends IResponsePage<IUserRole>
{
}