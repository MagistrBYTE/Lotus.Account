import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { CommandService, CommandServiceClass } from 'src/shared/command/CommandService';
import { localization } from 'src/resources/localization';
import { ICommand, BaseCommand } from 'src/shared/command/Command';
import { NavigationCommand } from 'src/shared/command/NavigationCommand';
import { routes } from 'src/app/routes';

class AccountCommandsClass extends CommandServiceClass
{
  private static _AccountCommands: AccountCommandsClass;

  public static override get Instance(): AccountCommandsClass 
  {
    return (this._AccountCommands || (this._AccountCommands = new this()));
  }  

  // #region СВОЙСТВА
  /**
   * Аккаунт
   */    
  account: ICommand;

  /**
   * Профиль
   */  
  profile: ICommand;

  /**
   * Настройки
   */  
  settings: ICommand;

  /**
   * Уведомления
   */  
  notification: ICommand;
  // #endregion 

  constructor() 
  {
    super();
    
    this.account = new BaseCommand('account');
    this.account.icon = <AccountCircle/>;
    this.account.label = 'Аккаунт';
    this.account.group = 'account';
    this.commands.push(this.account);

    this.profile = new NavigationCommand('userProfile', routes.userProfile);
    this.profile.icon = <PersonIcon/>;
    this.profile.label = localization.profile.profile;
    this.profile.group = 'account'; 
    this.commands.push(this.profile);
    
    this.settings = new NavigationCommand('userSettings', routes.userSettings);
    this.settings.icon = <SettingsIcon/>;
    this.settings.label = localization.settings.settings;
    this.settings.group = 'account';
    this.commands.push(this.settings);
    
    this.notification = new NavigationCommand('userNotifications', routes.userNotifications);
    this.notification.icon = <NotificationsIcon/>;
    this.notification.label = localization.notification.notification;
    this.notification.group = 'account';
    this.commands.push(this.notification);

    CommandService.addCommands(this.commands);
  }
}

/**
 * Глобальный доступ к коммандам связанным с аккаунтом пользователя 
 */
export const AccountCommands = AccountCommandsClass.Instance;
