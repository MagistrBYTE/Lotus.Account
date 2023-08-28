import React from 'react';
import { AppBar, IconButton, SxProps, Theme, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
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

  const handleFooterCollapsed = () =>
  {
    const status = !layoutState.footer.isCollapsed;
    dispatch(collapseFooterLayoutAction(status));
  }

  return <>{layoutState.footer.isVisibleUser && layoutState.footer.isVisible &&
    <AppBar position="fixed" color="inherit" sx={layoutState.footer.isCollapsed ? sxCollapsed : sxNoraml}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleFooterCollapsed } >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  }
  </>
};
