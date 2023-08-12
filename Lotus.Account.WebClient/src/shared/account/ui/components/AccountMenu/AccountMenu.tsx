import React from 'react';
import { Divider, IconButton, IconButtonProps, Menu, Typography } from '@mui/material';
import { accountNavigation } from 'src/shared/account/accountNavigation';
import { NavButton, TNavButtonType } from 'src/shared/navigation';
import { AuthApi, authNavigation } from 'src/shared/auth';
import { localization } from 'src/shared/localization';

export interface IAccountMenuProps extends IconButtonProps
{
    isVisibleCaption?: boolean;
}

export const AccountMenu: React.FC<IAccountMenuProps> = ({isVisibleCaption, ...propsIcon}:IAccountMenuProps) => 
{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuId = 'primary-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => 
  {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => 
  {
    setAnchorEl(null);
  };

  const handleMenuLogout = async () =>
  {
    handleMenuClose();
    await AuthApi.Logout();
  }

  return <>
    <>
      <IconButton
        {...propsIcon}
        onClick={handleMenuOpen}>
        {accountNavigation.account.icon}
      </IconButton>
      {isVisibleCaption && <Typography variant='subtitle2' fontSize={12}>{localization.auth.account}</Typography>}
    </>
    <Menu 
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'bottom', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <NavButton buttonType={TNavButtonType.MenuItem} onBeforeNavigation={handleMenuClose} {...accountNavigation.profile}/>
      <NavButton buttonType={TNavButtonType.MenuItem} onBeforeNavigation={handleMenuClose} {...accountNavigation.configuration}/>
      <NavButton buttonType={TNavButtonType.MenuItem} onBeforeNavigation={handleMenuClose} {...accountNavigation.notification}/>
      <Divider/>
      <NavButton buttonType={TNavButtonType.MenuItem} onBeforeNavigation={handleMenuLogout} {...authNavigation.logout}/>
    </Menu>
  </>
};