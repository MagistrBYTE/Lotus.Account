import React from 'react';
import { IconButton, IconButtonProps, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Stack, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { INavigationPath } from 'src/shared/navigation/NavigationTypes';
import { VerticalStack } from 'src/ui/components/Layout';

export enum TNavButtonType
{
  Icon = 'Icon',

  ListItem = 'ListItem',

  MenuItem = 'MenuItem'
}

export interface INavButtonProps extends IconButtonProps, INavigationPath
{
  isVisibleLabel?: boolean;  

  buttonType: TNavButtonType;

  onBeforeNavigation?: (navigation: INavigationPath) => void;
}

export const NavButton: React.FC<INavButtonProps> = (props:INavButtonProps) => 
{
  const {isVisibleLabel, buttonType, onBeforeNavigation, icon, label, permissions, isShouldBeAuthorized, order, group, path, ...propsButton  } = props;

  const theme = useTheme();
  
  const location = useLocation();
  const navigate = useNavigate();

  const isSelected = location.pathname === path;

  const handleClick = () => 
  {
    if(onBeforeNavigation)
    {
      onBeforeNavigation(props);
    }

    if(path !== '')
    {
      navigate(path);
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
    case TNavButtonType.Icon:
    {
      const colorSelected = isSelected ? 'primary' : undefined; 
      if(isVisibleLabel && label !== '')
      {
        return (<VerticalStack alignItems={'center'}>
          <IconButton {...propsButton} color={colorSelected} onClick={handleClick}>
            {icon}
          </IconButton>
          <Typography variant='subtitle2' color={colorSelected} fontSize={12}>{label}</Typography>
        </VerticalStack>)
      }
      else
      {
        return (<IconButton {...propsButton} color={colorSelected} onClick={handleClick}>
          {icon}
        </IconButton>)
      }
    }
    case TNavButtonType.ListItem:
    {
      return <ListItem disablePadding>
        <ListItemButton onClick={handleClick}
          selected={isSelected}
          sx={sxListItemSelected}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          {isVisibleLabel && label !== '' && <ListItemText primary={label} /> }
        </ListItemButton>
      </ListItem>
    }
    case TNavButtonType.MenuItem:
    {
      return <MenuItem onClick={handleClick}>
        <IconButton {...propsButton}>
          {icon}
        </IconButton>
        {label}
      </MenuItem> 
    }
  } 
  return <></>
};