import { IConstantable } from 'src/core/types/Constantable';
import { IEditable } from 'src/core/types/Editable';

export interface IUser extends IEditable, IConstantable
{
	//
	// ИДЕНТИФИКАЦИЯ
	//    
    id: string;
    login: string;
    email?: string;
    emailConfirmed: boolean;

	//
	// ПЕРСОНАЛЬНЫЕ ДАННЫЕ
	//    
    name?: string;
    surname?: string;
    patronymic?: string;
    birthday?: string;

    roleId: number;
    postId?: number;
    groupsIds?: number[];
    fieldActivitiesIds?: number[];
    avatarId?: number;
}