import { IResponsePage } from 'src/core/types/Response';
import { IPosition } from '../domain/Position';

export interface IPositionsResponse extends IResponsePage<IPosition>
{
}