
export interface IUserCreateRequest
{
	//
	// ИДЕНТИФИКАЦИЯ
	//     
    login: string;
    email?: string;
    password: string;

	//
	// ПЕРСОНАЛЬНЫЕ ДАННЫЕ
	//    
    name?: string;
    surname?: string;
    patronymic?: string;
}