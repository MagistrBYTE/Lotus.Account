import React from 'react';
import { SxProps, Theme, Drawer, List, useTheme, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'src/app/store';
import { VerticalStack } from 'src/ui/components/Layout';
import { TScreenType, openLeftPanelLayoutAction, useLayoutState } from 'src/app/layout';
import { CommandService } from 'src/shared/command/CommandService';
import { CommandButton } from 'src/ui/components/Editor';
import { TCommandButtonType } from 'src/ui/components/Editor/CommandButton';
import { TokenHelper } from 'src/modules/auth';
import { AccountMenu } from 'src/widgets/account/AccountMenu';

export interface ILeftPanelProps
{
}

export const LeftPanel: React.FC<ILeftPanelProps> = (props:ILeftPanelProps) => 
{
  const theme = useTheme();
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();

  const isAuth = TokenHelper.isAccessToken();

  const toggleDrawer = () => 
  {
    const status = !layoutState.leftPanel.isOpen;
    dispatch(openLeftPanelLayoutAction(status));
  };

  const handleBeforeNavigation = () =>
  {
    dispatch(openLeftPanelLayoutAction(false));
  }

  const commands = CommandService.getCommandsByName(useLayoutState().leftPanelCommands);

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
      {commands && commands.length > 0 &&
      <List>
        {
          commands.map((command, index) => 
          {          
            return <CommandButton key={index} 
              isVisibleLabel 
              buttonType={TCommandButtonType.ListItem}
              command={command}
              onBeforeCommand={handleBeforeNavigation} />;
          })
        } 
      </List>
      }
    </Drawer>
  }
  else
  {
    const marginLeft = 1;
    const marginRight = 1;
  
    const actualWidthPanel = layoutState.leftPanel.minWidth - (marginLeft * 8 + marginRight * 8);

    return <VerticalStack sx={{marginLeft: marginLeft, marginRight: marginRight, width: actualWidthPanel}} alignItems={'center'}>
      <IconButton
        sx={{margin: 1}}
        onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      {layoutState.leftPanel.isOpen && commands.map((command, index) => 
      {          
        return <CommandButton key={index} 
          isVisibleLabel 
          buttonType={TCommandButtonType.Icon}
          command={command}
          onBeforeCommand={handleBeforeNavigation} />;
      })}
      {layoutState.leftPanel.isOpen && isAuth && <AccountMenu isVisibleCaption/>}    
    </VerticalStack>
  }
};