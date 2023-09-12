import { IResponsePage } from 'src/shared/types/Response';
import { IUserGroup } from '../domain/UserGroup';

export interface IUserGroupsResponse extends IResponsePage<IUserGroup>
{
}