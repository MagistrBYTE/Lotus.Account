import { IConstantable } from 'src/shared/types/Constantable';
import { IEditable } from 'src/shared/types/Editable';

/**
 * Разрешение
 */
export interface IUserPermission extends IEditable, IConstantable
{
    /**
     * Идентификатор
     */
    id: number;

    /**
     * Наименование
     */
    name: string;

    /**
     * Отображаемое имя
     */
    displayName?: string;
}