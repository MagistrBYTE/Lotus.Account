import { IResponsePage } from 'src/core/types/Response';
import { IPermission } from '../domain/Permission';

export interface IPermissionsResponse extends IResponsePage<IPermission>
{
}