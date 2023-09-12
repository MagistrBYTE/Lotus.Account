import { IConstantable } from 'src/shared/types/Constantable';
import { IEditable } from 'src/shared/types/Editable';

/**
 * Группа пользователя
 */
export interface IUserGroup extends IEditable, IConstantable
{
    /**
     * Идентификатор группы
     */
    id: number;

    /**
     * Наименование группы
     */
    name: string;

    /**
     * Отображаемое наименование группы
     */
    displayName?: string;
}