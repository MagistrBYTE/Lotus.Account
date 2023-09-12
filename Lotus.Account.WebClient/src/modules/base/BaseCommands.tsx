import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { CommandService, CommandServiceClass } from 'src/shared/command/CommandService';
import { ICommand } from 'src/shared/command/Command';
import { NavigationCommand } from 'src/shared/command/NavigationCommand';
import { routes } from 'src/app/routes';

class BaseCommandsClass extends CommandServiceClass
{
  private static _BaseCommands: BaseCommandsClass;

  public static override get Instance(): BaseCommandsClass 
  {
    return (this._BaseCommands || (this._BaseCommands = new this()));
  }  

  // #region СВОЙСТВА
  /**
   * Домой
   */    
  home: ICommand;

  /**
   * О приложении
   */  
  about: ICommand;
  // #endregion 

  constructor() 
  {
    super();
    
    this.home = new NavigationCommand('home', routes.home);
    this.home.icon = <HomeIcon/>;
    this.home.label = 'Домой';
    this.home.group = 'base'; 
    this.commands.push(this.home);
    
    this.about = new NavigationCommand('about', routes.about);
    this.about.icon = <InfoIcon/>;
    this.about.label = 'О приложении';
    this.about.group = 'base';
    this.commands.push(this.about);

    CommandService.addCommands(this.commands);
  }
}

/**
 * Глобальный доступ к общим коммандам 
 */
export const BaseCommands = BaseCommandsClass.Instance;
