import { IResponsePage } from 'src/shared/types/Response';
import { IUserPosition } from '../domain/UserPosition';

export interface IUserPositionsResponse extends IResponsePage<IUserPosition>
{
}