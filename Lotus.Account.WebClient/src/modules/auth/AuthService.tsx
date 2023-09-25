import { deleteAllCookies } from 'src/shared/utils/cookies';
import { setCommandsLeftPanelLayoutAction } from 'src/app/layout';
import { KeyLayoutState } from 'src/app/layout/const/KeyLayoutState';
import { KeyTheme } from 'src/app/theme/const/KeyTheme';
import { CommandService } from 'src/shared/command/CommandService';
import { AdminCommands } from '../admin';
import { BaseCommands } from '../base';
import { TokenHelper } from './helpers/TokenHelper';
import { AuthApi } from './api/AuthApiService';
import { instanceOfSuccessAuthResponse } from './domain/SuccessAuthResponse';
import { IRegisterParameters } from './domain/RegisterParameters';

class AuthServiceClass
{
  private static _AuthService: AuthServiceClass;

  public static get Instance(): AuthServiceClass 
  {
    return (this._AuthService || (this._AuthService = new this()));
  }  

  constructor() 
  {
    this.Login = this.Login.bind(this);
    this.Register = this.Register.bind(this);
    this.Logout = this.Logout.bind(this);
    this.SetAuthCookie = this.SetAuthCookie.bind(this);
    this.IsAuthCookie = this.IsAuthCookie.bind(this);
    this.LoginAuthCookie = this.LoginAuthCookie.bind(this);      
  }

  /**
   * Вход через пароль и логин
   * @param login Логин
   * @param password Пароль
   * @param remembeMe Запомнить
   * @param redirectUrl URL-адрес перенаправления в случае успешного входа
   * @returns 
   */
  public async Login(login: string, password: string, remembeMe?: boolean, redirectUrl?: string) 
  {
    const response = await AuthApi.Login(login, password);
    if(response)
    {
      const data = instanceOfSuccessAuthResponse(response.data);
      if (data) 
      {
        TokenHelper.setData(data);

        if(remembeMe)
        {
          this.SetAuthCookie(login, password);
        }

        if(redirectUrl)
        {
          location.assign(redirectUrl);
        }
      }
    }    
  }

  /**
   * Регистрация нового пользователя
   * @param registerParameters Параметры для регистрации нового пользователя
   * @param redirectUrl URL-адрес перенаправления в случае успешной регистрации
   */
  public async Register(registerParameters: IRegisterParameters, redirectUrl?: string)
  {
    await AuthApi.Register(registerParameters);
    if(redirectUrl)
    {
      location.assign(redirectUrl);
    }
  }  

  /**
   * Выход из сайта
   */
  public async Logout()
  {
    await AuthApi.Logout();

    // Удаляем все куки
    deleteAllCookies();

    // Очищаем
    TokenHelper.clearAccessToken();

    // Очищаем дополнительные зависимости
    window.localStorage.removeItem(KeyLayoutState);
    window.localStorage.removeItem(KeyTheme);

    location.assign('/');
  }

  /**
   * Установить куки для автоматического входа на сайт
   * @param login Логин
   * @param password Пароль
   */
  public SetAuthCookie(login: string, password: string)
  {
    AuthApi.SetAuthCookie(login, password);
  }

  /**
   * Проверка куки для автоматического входа на сайт
   * @returns 
   */  
  public IsAuthCookie():boolean
  {
    return AuthApi.IsAuthCookie();
  }

  /**
   * Автоматического входа на сайт используя куку
   * @param redirectUrl URL-адрес перенаправления в случае успешного входа
   * @returns 
   */
  public LoginAuthCookie(redirectUrl?: string)
  {
    AuthApi.LoginAuthCookie(redirectUrl);
  }
}

/**
 * Глобальный доступ к сервису по авторизации и регистрации пользователя 
 */
export const AuthService = AuthServiceClass.Instance;