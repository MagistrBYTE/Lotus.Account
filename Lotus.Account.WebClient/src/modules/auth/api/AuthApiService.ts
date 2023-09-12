import axios, { InternalAxiosRequestConfig } from 'axios';
import { ApiService } from 'src/shared/api/ApiService';
import { getCookie, setCookie } from 'src/shared/utils/cookies';
import moment from 'moment';
import { instanceOfSuccessAuthResponse } from '../domain/SuccessAuthResponse';
import { TokenHelper } from '../helpers/TokenHelper';
import { IRegisterParameters } from '../domain/RegisterParameters';

/**
 * Класс для сервисов Api с поддрежкой авторизации 
 */
export class AuthApiService extends ApiService 
{
  private static _AuthApi: AuthApiService;

  /**
   * Дельта времени истечения срока действия токена, в секундах
   */   
  private static RefreshTokenDelta: number = 10;
  
  /**
   * Имя куки для автоматического входа на сайт 
   */ 
  private static AuthCookieName: string = 'lotus-account-web-client';

  /**
   * Разделить для формирования хешируемой строки авто доступа
   */    
  private static DelimeterHash: string = '(!=====!)';    

  public static get Instance(): AuthApiService 
  {
    return (this._AuthApi || (this._AuthApi = new this()));
  }

  /**
   * Маршруты для которых не требуется авторизации
   */   
  protected static RouteNotAuth: string[] = [];  


  constructor()
  {
    super();
    this.Login = this.Login.bind(this);
    this.RefreshToken = this.RefreshToken.bind(this);
    this.Logout = this.Logout.bind(this);
    this.Register = this.Register.bind(this);

    AuthApiService.RouteNotAuth.push('connect/token');
    AuthApiService.RouteNotAuth.push('connect/logout');
    AuthApiService.RouteNotAuth.push('api/Authorize/Register');
  }  

  protected override async handleRequest(config: InternalAxiosRequestConfig<any>):Promise<InternalAxiosRequestConfig<any>>
  {
    // Смотрим нужно ли добавлять заголовок для авторизации
    const isAddToken = (AuthApiService.RouteNotAuth.includes(config.url ?? '') === false);

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
          TokenHelper.clearAccessToken();
          window.location.reload();
        }
      }
      
      // Токен протух
      if(curTime > expTime)
      {
        // Если есть возможность то автоматически входим на сайт
        if(AuthApi.IsAuthCookie())
        {
          AuthApi.LoginAuthCookie();
        }
        else
        {
          TokenHelper.clearAccessToken();
          window.location.reload();
        }
      }
      else
      {
        const accessToken = TokenHelper.getAccessToken();
    
        if(accessToken)
        {
          const headerNameAuth = 'Authorization';
          const headerNameValue = `Bearer ${accessToken}`;

          config.headers.set(headerNameAuth, headerNameValue);
          config.withCredentials = false;
        }
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
    
    const config = this.getConfigAcceptJson();

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
    
    const config = this.getConfigAcceptJson();

    const response = await this.api.post(url, data, config);
    return response;
  }

  /**
   * Выход из сайта
   */
  public async Logout()
  {
    const url = 'connect/logout';

    const config = this.getConfigAcceptJson();  

    await this.api.post(url, null, config);
  }

  /**
   * Регистрация нового пользователя
   * @param registerParameters Параметры для регистрации нового пользователя
   */
  public async Register(registerParameters: IRegisterParameters)
  {
    const url = 'api/Authorize/Register';  
    await this.api.post(url, registerParameters);
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
    const cook = getCookie(AuthApiService.AuthCookieName);
    return cook !== undefined;
  }

  /**
   * Автоматического входа на сайт используя куку
   * @param redirectUrl URL-адрес перенаправления в случае успешного входа
   * @returns 
   */
  public LoginAuthCookie(redirectUrl?: string)
  {
    const hash = getCookie(AuthApiService.AuthCookieName)!;
    const value = window.atob(hash);

    const index = value.indexOf(AuthApiService.DelimeterHash);
    const login = value.substring(0, index);
    const password = value.substring(index + AuthApiService.DelimeterHash.length);

    console.log(`login = ${login}`);
    console.log(`password = ${password}`);

    const responseWait = AuthApi.Login(login, password);
    responseWait.then((response)=>
    {
      if(response)
      {
        const data = instanceOfSuccessAuthResponse(response.data);
        if (data) 
        {
          TokenHelper.setData(data);
  
          if(redirectUrl)
          {
            location.assign(redirectUrl);
          }
        }
      } 
    });
  }   
}

/**
 * Глобальный экземпляр для доступа к Api для авторизации
 */
export const AuthApi = AuthApiService.Instance;
