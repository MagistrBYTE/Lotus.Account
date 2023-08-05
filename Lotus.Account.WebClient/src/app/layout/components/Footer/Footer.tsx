import React, { useState } from 'react';
import { AppBar, Box, IconButton, SxProps, Theme, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch } from 'src/app/store';
import { collapseFooterLayoutAction, useLayoutState } from 'src/shared/layout';

export interface IFooterProps
{
}

export const Footer: React.FC<IFooterProps> = (props:IFooterProps) => 
{
  const theme = useTheme();
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();

  const sxNoraml:SxProps<Theme> = 
  {
    top: 'auto', 
    bottom: 0, 
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  };

  const sxCollapsed:SxProps<Theme>  = {
    top: 'auto', 
    bottom: 0, 
    width: `${64}px`,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  };

  return <>{layoutState.footer.isVisible &&
    <AppBar position="fixed" color="inherit" sx={layoutState.footer.isCollapsed ? sxCollapsed : sxNoraml}>
      <Toolbar>
        {Number(layoutState.footer.isCollapsed).toString()}
        <IconButton color="inherit" aria-label="open drawer" onClick={()=>
        {
          const status = !layoutState.footer.isCollapsed;
          dispatch(collapseFooterLayoutAction(status));
        }
        } >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <SearchIcon />
          
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  }
  </>
};
