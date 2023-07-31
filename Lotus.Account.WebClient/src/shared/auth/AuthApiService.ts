import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { ApiService } from 'src/core/api/ApiService';
import { deleteAllCookies, getCookie, setCookie } from 'src/core/utils/cookies';
import moment from 'moment';
import { TokenHelper } from './TokenHelper';
import { instanceOfSuccessAuthResponse } from './SuccessAuthResponse';

/**
 * Класс для сервисов Api с поддрежкой авторизации 
 */
export class AuthApiService extends ApiService 
{
  private static _AuthApi: AuthApiService;

  /**
   * Имя куки для автоматического входа на сайт 
   */ 
  private static AuthCookieName: string = 'lotus-account-web-client';

  /**
   * Дельта времени истечения срока действия токена, в секундах
   */   
  private static RefreshTokenDelta: number = 10;

  /**
   * Разделить для формирования хешируемой строки авто доступа
   */    
  private static DelimeterHash: string = '(!=====!)';

  public static get Instance(): AuthApiService 
  {
    return (this._AuthApi || (this._AuthApi = new this()));
  }

  constructor()
  {
    super();
  }   

  /**
   * Роуты, которые не требуют авторизацию.
   */
  protected noAuthRoute(uri:string):boolean 
  {
    const token = 'connect/token';
    const register = 'register';
    return uri.includes(token) || uri.includes(register);
  } 

  protected async handleRequest(config: InternalAxiosRequestConfig<any>):Promise<InternalAxiosRequestConfig<any>>
  {
    // Смотрим нужно ли добавлять заголовок для авторизации
    const isAddToken = AuthApi.noAuthRoute(config.url ?? '') === false;

    if(isAddToken)
    {
      // Получаем текущее время и время устаревания токена
      const expTime = TokenHelper.getExpiresIn();
      const curTime = new Date().getTime() / 1000; 
      
      // Сравниваем, если разница более 10 секунд - запускаем процедуру получения нового токена из refresh_token
      const delta = curTime - expTime;
      if (delta <= AuthApiService.RefreshTokenDelta) 
      {
        try
        {
          const response = await AuthApi.RefreshToken();
          if(response)
          {
            const data = instanceOfSuccessAuthResponse(response.data);
            if (data) 
            {
              TokenHelper.setData(data);
            }
          }
        }
        catch(error)
        {

        }
      }      

      const accessToken = TokenHelper.getAccessToken();
    
      if(accessToken)
      {
        const headerNameAuth = 'Authorization';
        const headerNameValue = `Bearer ${accessToken}`;

        config.headers.set(headerNameAuth, headerNameValue);
        config.withCredentials = false;
      }
    }

    config.timeout = 10 * 60 * 1000;
    config.cancelToken = axios.CancelToken.source().token;

    return config;
  }  

  /**
   * Вход через пароль и логин
   * @param login Логин
   * @param password Пароль
   * @returns 
   */
  public async Login(login: string, password: string) 
  {
    const url = 'connect/token';

    const data = new URLSearchParams({
      username: login,
      password: password,
      grant_type: 'password',
      scope: 'offline_access'
    })
    
    const config:AxiosRequestConfig = {
      headers:
      {
        'Accept': 'application/json'
      }
    }

    const response = await this.api.post(url, data, config);
    return response;
  }

  /**
   * Обновление токена
   * @returns 
   */
  public async RefreshToken() 
  {
    const url = 'connect/token';

    const data = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: TokenHelper.getRefreshToken()!,
      scope: 'offline_access'
    })
    
    const config:AxiosRequestConfig = {
      headers:
      {
        'Accept': 'application/json'
      }
    }

    const response = await this.api.post(url, data, config);
    return response;
  }

  /**
   * Выход из сайта
   */
  public async Logout()
  {
    const url = 'api/Authorize/Logout';

    // Удаляем все куки
    deleteAllCookies();

    // Очищаем
    TokenHelper.clearAccessToken();

    await this.api.post(url);
  }

  /**
   * Установить куки для автоматического входа на сайт
   * @param login Логин
   * @param password Пароль
   */
  public SetAuthCookie(login: string, password: string)
  {
    const value = login + AuthApiService.DelimeterHash + password; 
    
    // Самое простое шифрование
    const hash = window.btoa(value);

    // Установим на 7 дней
    const date:Date = moment().add(7, 'days').toDate();
    
    setCookie(AuthApiService.AuthCookieName, hash, false, {expires: date});
  }

  /**
   * Проверка куки для автоматического входа на сайт
   * @returns 
   */  
  public IsAuthCookie():boolean
  {
    const hash = getCookie(AuthApiService.AuthCookieName);
    return hash !== undefined;
  }

  /**
   * Автоматического входа на сайт используя куку
   * @returns 
   */
  public async LoginAuthCookie()
  {
    const hash = getCookie(AuthApiService.AuthCookieName)!;
    const value = window.atob(hash);

    const index = value.indexOf(AuthApiService.DelimeterHash);
    const login = value.substring(0, index);
    const password = value.substring(index + AuthApiService.DelimeterHash.length);

    console.log(`login = ${login}`);
    console.log(`password = ${password}`);

    return await this.Login(login, password);
  }
}

/**
 * Глобальный экземпляр для доступа к Api для авторизации
 */
export const AuthApi = AuthApiService.Instance;
