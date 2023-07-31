import { IResponsePage } from 'src/core/types/Response';
import { IGroup } from '../domain/Group';

export interface IGroupsResponse extends IResponsePage<IGroup>
{
}