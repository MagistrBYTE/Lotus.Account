import React from 'react';
import GamesIcon from '@mui/icons-material/Games';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import GroupsIcon from '@mui/icons-material/Groups';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import { CommandService, CommandServiceClass } from 'src/shared/command/CommandService';
import { BaseCommand, ICommand } from 'src/shared/command/Command';
import { NavigationCommand } from 'src/shared/command/NavigationCommand';
import { localization } from 'src/resources/localization';
import { routes } from 'src/app/routes';
import { EventCommand } from 'src/shared/command/EventCommand';

class AdminCommandsClass extends CommandServiceClass
{
  private static _AdminCommands: AdminCommandsClass;

  public static override get Instance(): AdminCommandsClass 
  {
    return (this._AdminCommands || (this._AdminCommands = new this()));
  }  

  // #region СВОЙСТВА
  /**
   * Управление ролями
   */    
  roles: ICommand;

  /**
   * Управление разрешениями
   */  
  permisions: ICommand;

  /**
   * Управление должностями
   */  
  positions: ICommand; 

  /**
   * Управление группами
   */  
  groups: ICommand;   
  // #endregion 

  constructor() 
  {
    super();
    
    // this.roles = new NavigationCommand('userRoles', routes.userRoles);
    this.roles = new EventCommand('userRoles');
    this.roles.icon = <GamesIcon/>
    this.roles.label = localization.role.roles
    this.roles.group = 'admin';
    this.commands.push(this.roles);

    this.permisions = new NavigationCommand('userPermissions', routes.userPermissions);
    this.permisions.icon = <PermDeviceInformationIcon/>
    this.permisions.label = localization.permission.permissions;
    this.permisions.group = 'admin'; 
    this.commands.push(this.permisions);

    this.positions = new NavigationCommand('userPositions', routes.userPositions);
    this.positions.icon = <PictureInPictureIcon/>
    this.positions.label = localization.position.positions;
    this.positions.group = 'admin'; 
    this.commands.push(this.positions);  

    this.groups = new NavigationCommand('userGroups', routes.userGroups);
    this.groups.icon = <GroupsIcon/>
    this.groups.label = localization.group.groups;
    this.groups.group = 'admin'; 
    this.commands.push(this.groups);   

    CommandService.addCommands(this.commands);
  }
}

/**
 * Глобальный доступ к командам связанным с управлением пользователями 
 */
export const AdminCommands = AdminCommandsClass.Instance;