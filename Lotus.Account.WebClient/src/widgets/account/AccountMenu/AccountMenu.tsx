import React from 'react';
import { Divider, IconButton, IconButtonProps, Menu, Typography } from '@mui/material';
import { AuthCommands, AuthService } from 'src/modules/auth';
import { AccountCommands } from 'src/modules/account';
import { localization } from 'src/resources/localization';
import { CommandButton } from 'src/ui/components/Editor';
import { TCommandButtonType } from 'src/ui/components/Editor/CommandButton';
import { useAppDispatch } from 'src/app/store';

export interface IAccountMenuProps extends IconButtonProps
{
    isVisibleCaption?: boolean;
}

export const AccountMenu: React.FC<IAccountMenuProps> = ({isVisibleCaption, ...propsIcon}:IAccountMenuProps) => 
{
  const [anchorElem, setAnchorElem] = React.useState<null | HTMLElement>(null);
  const menuId = 'primary-account-menu';
  const isMenuOpen = Boolean(anchorElem);

  const dispatch = useAppDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => 
  {
    setAnchorElem(event.currentTarget);
  };

  const handleMenuClose = () => 
  {
    setAnchorElem(null);
  };

  const handleMenuLogout = async () =>
  {
    handleMenuClose();
    await AuthService.Logout(dispatch);
  }

  return <>
    <>
      <IconButton
        {...propsIcon}
        onClick={handleMenuOpen}>
        {AccountCommands.account.icon}
      </IconButton>
      {isVisibleCaption && <Typography variant='subtitle2' fontSize={12}>{localization.auth.account}</Typography>}
    </>
    <Menu 
      anchorEl={anchorElem}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'bottom', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <CommandButton buttonType={TCommandButtonType.MenuItem} onBeforeCommand={handleMenuClose} command={AccountCommands.profile} />
      <CommandButton buttonType={TCommandButtonType.MenuItem} onBeforeCommand={handleMenuClose} command={AccountCommands.settings}/>
      <CommandButton buttonType={TCommandButtonType.MenuItem} onBeforeCommand={handleMenuClose} command={AccountCommands.notification}/>
      <Divider/>
      <CommandButton buttonType={TCommandButtonType.MenuItem} onBeforeCommand={handleMenuLogout}  command={AuthCommands.logout}/>
    </Menu>
  </>
};