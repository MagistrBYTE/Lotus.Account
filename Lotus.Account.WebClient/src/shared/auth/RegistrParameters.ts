/**
 *  Регистрация нового пользователя
 */
export interface IRegistrParameters 
{
	//
	// ИДЕНТИФИКАЦИЯ
	//     
  login: string;
  email: string;
  password: string;

  //
  // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
  //    
  name?: string;
  surname?: string;
  patronymic?: string;
};