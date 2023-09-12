import { IConstantable } from 'src/shared/types/Constantable';
import { IEditable } from 'src/shared/types/Editable';

export interface IUserRole extends IEditable, IConstantable
{
    id: number;
    name: string;
    displayName?: string;
    permissionIds: number[];
}