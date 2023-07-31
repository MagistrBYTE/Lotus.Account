import { IConstantable } from 'src/core/types/Constantable';
import { IEditable } from 'src/core/types/Editable';

export interface IRole extends IEditable, IConstantable
{
    id: number;
    systemName: string;
    dispalyName?: string;
    permissionIds: number[];
}