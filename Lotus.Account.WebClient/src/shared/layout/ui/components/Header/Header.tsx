import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'src/app/store';
import { openLeftPanelLayoutAction, showHeaderLayoutAction, useLayoutState } from 'src/shared/layout';
import { AccountMenu } from 'src/shared/account';

export interface IHeaderProps 
{

}

export const Header: React.FC<IHeaderProps> = ({}:IHeaderProps) => 
{
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();

  const toggleDrawer = () => 
  {
    const status = !layoutState.leftPanel.isOpen;
    dispatch(openLeftPanelLayoutAction(status));
  };

  const handleHideScroll = (hide: boolean) =>
  {
    dispatch(showHeaderLayoutAction(hide));
  }

  return  <>{layoutState.header.isVisible &&
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }}>
            {layoutState.screenType}
          </Box>
          <Box>
            <AccountMenu color='inherit' />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>}
  </>
};

