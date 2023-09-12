import { IResponsePage } from 'src/shared/types/Response';
import { IUserPermission } from '../domain/UserPermission';

export interface IUserPermissionsResponse extends IResponsePage<IUserPermission>
{
}