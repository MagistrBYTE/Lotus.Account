import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'src/app/store';
import { paths } from 'src/app/routes/paths';
import { NotificationInfoButton } from 'src/modules/notification';
import { openLeftPanelLayoutAction, showHeaderLayoutAction, useLayoutState } from 'src/shared/layout';
import { MessageItem } from './components/MessageItem';
import { AccountMenu } from './components/AccountMenu';

export interface IHeaderMainProps 
{

}

export const MainHeader: React.FC<IHeaderMainProps> = ({}:IHeaderMainProps) => 
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
            aria-label="open drawer"
            onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }}>
            {layoutState.screenType}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NotificationInfoButton isVisibleCaption={false} />
            <MessageItem isVisibleCaption={false} onClick={()=> {navigate(paths.messages());}}/>
            <AccountMenu isVisibleCaption={true}/>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <AccountMenu isVisibleCaption={true}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>}
  </>
};

