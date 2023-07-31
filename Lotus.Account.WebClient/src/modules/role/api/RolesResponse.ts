import { IResponsePage } from 'src/core/types/Response';
import { IRole } from '../domain/Role';

export interface IRolesResponse extends IResponsePage<IRole>
{
}