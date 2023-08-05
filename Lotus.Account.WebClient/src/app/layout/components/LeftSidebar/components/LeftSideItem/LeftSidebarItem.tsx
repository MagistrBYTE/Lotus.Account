import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SxProps, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, useTheme } from '@mui/material';
import { useAppDispatch } from 'src/app/store';
import { openLeftPanelLayoutAction, useLayoutState } from 'src/shared/layout';

export interface ILeftSideItemProps
{
  path:string;

  title:string;

  icon:React.ReactNode;
}

export const LeftSidebarItem: React.FC<ILeftSideItemProps> = ({path, title, icon}:ILeftSideItemProps) => 
{
  const theme = useTheme();
  const layoutState = useLayoutState();
  
  const dispatch = useAppDispatch();
  
  const location = useLocation();
  const navigate = useNavigate();

  const sxListItemSelected:SxProps<Theme> = 
  {
    '&.Mui-selected': 
    {
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.primary.main
    }
  };

  return <>
    <ListItem disablePadding>
      <ListItemButton onClick={()=>
      {
        navigate(path);
        dispatch(openLeftPanelLayoutAction(false));
      }}
      selected={location.pathname === path}
      sx={sxListItemSelected}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        {layoutState.leftPanel.isOpen && <ListItemText primary={title} /> }
      </ListItemButton>
    </ListItem>
  </>
};
