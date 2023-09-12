/**
 *  Регистрация нового пользователя
 */
export interface IRegisterParameters 
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