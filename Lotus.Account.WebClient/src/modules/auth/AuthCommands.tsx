import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { CommandService, CommandServiceClass } from 'src/shared/command/CommandService';
import { BaseCommand, ICommand } from 'src/shared/command/Command';
import { NavigationCommand } from 'src/shared/command/NavigationCommand';
import { localization } from 'src/resources/localization';
import { routes } from 'src/app/routes';

class AuthCommandsClass extends CommandServiceClass
{
  private static _AuthCommands: AuthCommandsClass;

  public static override get Instance(): AuthCommandsClass 
  {
    return (this._AuthCommands || (this._AuthCommands = new this()));
  }  

  // #region СВОЙСТВА
  /**
   * Вход
   */    
  login: ICommand;

  /**
   * Автоматический вход на сайт
   */  
  autoLogin: ICommand;

  /**
   * Зарегистрироваться
   */  
  register: ICommand;

  /**
   * Восстановить пароль
   */  
  restorePassword: ICommand;

  /**
   * Выход
   */  
  logout: ICommand;
  // #endregion 

  constructor() 
  {
    super();
    
    this.login = new NavigationCommand('login', routes.login);
    this.login.label = localization.auth.entrance;
    this.login.group = 'auth';
    this.commands.push(this.login);

    this.autoLogin = new NavigationCommand('autoLogin', routes.autoLogin);
    this.autoLogin.label = localization.auth.autoComeIn;
    this.autoLogin.group = 'auth'; 
    this.commands.push(this.autoLogin);
    
    this.register = new NavigationCommand('register', routes.register);
    this.register.label = localization.auth.register;
    this.register.group = 'auth';
    this.commands.push(this.register);
    
    this.restorePassword = new NavigationCommand('restorePassword', routes.restorePassword);
    this.restorePassword.label = localization.auth.restorePassword;
    this.restorePassword.group = 'auth';
    this.commands.push(this.restorePassword);
    
    this.logout = new BaseCommand('logout');
    this.logout.icon = <LogoutIcon />;
    this.logout.label = localization.auth.logout;
    this.logout.group = 'auth';
    this.commands.push(this.logout);

    CommandService.addCommands(this.commands);
  }
}

/**
 * Глобальный доступ к командам связанным с авторизацией и регистрацией пользователя 
 */
export const AuthCommands = AuthCommandsClass.Instance;