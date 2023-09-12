import React from 'react';
import { IconButton, IconButtonProps, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { VerticalStack } from 'src/ui/components/Layout';
import { ICommand } from 'src/shared/command/Command';
import { NavigationCommand } from 'src/shared/command/NavigationCommand';

export enum TCommandButtonType
{
  Icon = 'Icon',

  ListItem = 'ListItem',

  MenuItem = 'MenuItem'
}

export interface ICommandButtonProps extends IconButtonProps
{
  isVisibleLabel?: boolean;  

  buttonType: TCommandButtonType;

  onBeforeCommand?: () => void;

  command: ICommand;
}

export const CommandButton: React.FC<ICommandButtonProps> = (props:ICommandButtonProps) => 
{
  const {isVisibleLabel, buttonType, onBeforeCommand, command, ...propsButton  } = props;

  const theme = useTheme();
  
  const location = useLocation();
  const navigate = useNavigate();

  const isSelected = command.isSelected();

  const handleClick = () => 
  {
    if(onBeforeCommand)
    {
      onBeforeCommand();
    }

    if(command)
    {
      if(command instanceof NavigationCommand)
      {
        if(command.route!.path !== '' && location.pathname !== command.route!.path)
        {
          navigate(command.route!.path);
        }
      }
      else
      {
        command.execute();
      }
    }
  };

  const sxListItemSelected:SxProps<Theme> = 
  {
    '&.Mui-selected': 
    {
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.primary.main
    }
  };  

  switch(buttonType)
  {
    case TCommandButtonType.Icon:
    {
      const colorSelected = isSelected ? 'primary' : undefined; 
      if(isVisibleLabel && command.label !== '')
      {
        return (<VerticalStack alignItems={'center'}>
          <IconButton {...propsButton} color={colorSelected} disabled={!command.canExecute()} onClick={handleClick}>
            {command.icon}
          </IconButton>
          <Typography variant='subtitle2' color={colorSelected} fontSize={12}>{command.icon}</Typography>
        </VerticalStack>)
      }
      else
      {
        return (<IconButton {...propsButton} color={colorSelected} disabled={!command.canExecute()} onClick={handleClick}>
          {command.icon}
        </IconButton>)
      }
    }
    case TCommandButtonType.ListItem:
    {
      return <ListItem  disablePadding>
        <ListItemButton disabled={!command.canExecute()} onClick={handleClick}
          selected={isSelected}
          sx={sxListItemSelected}>
          <ListItemIcon>
            {command.icon}
          </ListItemIcon>
          {isVisibleLabel && command.label !== '' && <ListItemText primary={command.label} /> }
        </ListItemButton>
      </ListItem>
    }
    case TCommandButtonType.MenuItem:
    {
      return <MenuItem disabled={!command.canExecute()}  onClick={handleClick}>
        <IconButton {...propsButton}>
          {command.icon}
        </IconButton>
        {command.label}
      </MenuItem> 
    }
  } 
  return <></>
};