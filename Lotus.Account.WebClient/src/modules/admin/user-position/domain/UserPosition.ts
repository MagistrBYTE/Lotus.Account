import { IConstantable } from 'src/shared/types/Constantable';
import { IEditable } from 'src/shared/types/Editable';

export interface IUserPosition extends IEditable, IConstantable
{
    id: number;
    name: string;
    displayName?: string;
}