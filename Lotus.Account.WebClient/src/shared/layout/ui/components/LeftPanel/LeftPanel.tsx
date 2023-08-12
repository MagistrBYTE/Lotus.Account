import React from 'react';
import { SxProps, Theme, Drawer, List, useTheme, IconButton, Stack } from '@mui/material';
import { TScreenType, openLeftPanelLayoutAction, useLayoutState } from 'src/shared/layout';
import { INavigationPath, NavButton, TNavButtonType } from 'src/shared/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'src/app/store';
import { mainNavigations } from 'src/app/mainNavigations';
import { getNavigationsByGroup } from 'src/shared/navigation/utils/getNavigationsByGroup';
import { AccountMenu } from 'src/shared/account';
import { VerticalStack } from 'src/ui/components/Layout';

export interface ILeftPanelProps
{
  navigations?: INavigationPath[]
}

export const LeftPanel: React.FC<ILeftPanelProps> = (props:ILeftPanelProps) => 
{
  const actulalNavigations:INavigationPath[] = props.navigations === undefined ? getNavigationsByGroup(mainNavigations, 'main') : props.navigations

  const theme = useTheme();
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();

  const toggleDrawer = () => 
  {
    const status = !layoutState.leftPanel.isOpen;
    dispatch(openLeftPanelLayoutAction(status));
  };

  const handleBeforeNavigation = () =>
  {
    dispatch(openLeftPanelLayoutAction(false));
  }

  if(layoutState.screenType != TScreenType.Landscape)
  {
    const sxDrawerCommonWidth:SxProps<Theme> = 
    {
      width: layoutState.leftPanel.width,
      marginTop: `${layoutState.header.height}px`,
      marginBottom: `${layoutState.footer.height}px`,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: layoutState.leftPanel.isOpen ? theme.transitions.duration.leavingScreen : theme.transitions.duration.enteringScreen})
    };

    return <Drawer
      sx={{
        ...sxDrawerCommonWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': 
      {
        ...sxDrawerCommonWidth,
        boxSizing: 'border-box'
      }
      }}
      anchor="left"
      open={layoutState.leftPanel.isOpen}
      onClose={()=>{dispatch(openLeftPanelLayoutAction(false))}}
    >
      {actulalNavigations && actulalNavigations.length > 0 &&
    <List>
      {
        actulalNavigations.map((x, index) => 
        {          
          return <NavButton key={index} isVisibleLabel buttonType={TNavButtonType.ListItem} {...x} onBeforeNavigation={handleBeforeNavigation} />;
        })
      } 
    </List>
      }
    </Drawer>
  }
  else
  {
    return <VerticalStack sx={{marginLeft: 1}} alignItems={'center'}>
      <IconButton
        sx={{margin: 1}}
        onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      {layoutState.leftPanel.isOpen && actulalNavigations.map((x, index) => 
      {          
        return <NavButton key={index} isVisibleLabel buttonType={TNavButtonType.Icon} {...x} />;
      })}
      {layoutState.leftPanel.isOpen && <AccountMenu isVisibleCaption/>}
    </VerticalStack>
  }
};