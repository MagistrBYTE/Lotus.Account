import React from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'src/app/store';
import { openLeftPanelLayoutAction, showHeaderLayoutAction, useLayoutState } from 'src/app/layout';
import { TokenHelper } from 'src/modules/auth';
import { AccountMenu } from 'src/widgets/account/AccountMenu';

export interface IHeaderProps 
{

}

export const Header: React.FC<IHeaderProps> = (props:IHeaderProps) => 
{
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();

  const isAuth = TokenHelper.isAccessToken();

  const toggleDrawer = () => 
  {
    const status = !layoutState.leftPanel.isOpen;
    dispatch(openLeftPanelLayoutAction(status));
  };

  const handleHideScroll = (hide: boolean) =>
  {
    dispatch(showHeaderLayoutAction(hide));
  }

  return  <>{layoutState.header.isVisibleUser && layoutState.header.isVisible &&
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
          {isAuth && <Box>
            <AccountMenu color='inherit' />
          </Box>}
        </Toolbar>
      </AppBar>
    </Box>}
  </>
};

