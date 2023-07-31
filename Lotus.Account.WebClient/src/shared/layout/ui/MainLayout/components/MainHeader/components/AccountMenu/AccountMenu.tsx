import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { paths } from 'src/app/routes/paths';
import { useLayoutState, TScreenType } from 'src/shared/layout';
import { NotificationInfoButton } from 'src/modules/notification';
import { TokenHelper } from 'src/shared/auth/TokenHelper';
import { MessageItem } from '../MessageItem';

export interface IAccountMenuProps
{
    isVisibleCaption: boolean;
}

export const AccountMenu: React.FC<IAccountMenuProps> = ({isVisibleCaption}:IAccountMenuProps) => 
{
  const layoutState = useLayoutState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuId = 'primary-search-account-menu';
  const isMobile = layoutState.screenType === TScreenType.Portrait;
  const isMenuOpen = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => 
  {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => 
  {
    setAnchorEl(null);
  };

  const handleMenuNotifications = () =>
  {
    handleMenuClose();
    navigate(paths.notifications());
  }

  const handleMenuMessages = () =>
  {
    handleMenuClose();
    navigate(paths.messages());
  }

  const handleMenuProfile = () =>
  {
    handleMenuClose();
    navigate(paths.profile());
  }

  const handleMenuConfiguration = () =>
  {
    handleMenuClose();
    navigate(paths.configuration());
  }

  const handleMenuLogout = () =>
  {
    handleMenuClose();
    TokenHelper.clearAccessToken();
    navigate(paths.home());
  }


  return <>
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleMenuOpen}
      color="inherit">
      <AccountCircle />
    </IconButton>
    <Menu 
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'bottom', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {isMobile && <MenuItem onClick={handleMenuNotifications}><NotificationInfoButton isVisibleCaption={true}/></MenuItem>}
      {isMobile && <MenuItem onClick={handleMenuMessages}><MessageItem isVisibleCaption={true}/></MenuItem>}
      <MenuItem onClick={handleMenuProfile}>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit">
          <PersonIcon />
        </IconButton>
        Профиль
      </MenuItem>
      <MenuItem onClick={handleMenuConfiguration}>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit">
          <SettingsIcon />
        </IconButton>
        Конфигурация
      </MenuItem>
      <Divider/>
      <MenuItem onClick={handleMenuLogout}>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit">
          <LogoutIcon />
        </IconButton>
        Выход
      </MenuItem>
    </Menu>
  </>
};