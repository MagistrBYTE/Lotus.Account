import React from 'react';
import { SxProps, Theme, Drawer, List, useTheme, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import GroupIcon from '@mui/icons-material/Group';
import ApprovalIcon from '@mui/icons-material/Approval';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { paths } from 'src/app/routes/paths';
import { useLayoutState } from 'src/shared/layout';
import { LeftSidebarItem } from './components/LeftSideItem';

export interface ILeftSidePanelProps
{

}

export const LeftSidebar: React.FC<ILeftSidePanelProps> = ({}:ILeftSidePanelProps) => 
{
  const theme = useTheme();
  const siteState = useLayoutState();

  const sxDrawerCommon:SxProps<Theme> = 
  {
    width: siteState.leftPanel.width,
    marginTop: `${siteState.header.height}px`,
    marginBottom: `${siteState.footer.height}px`,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: siteState.leftPanel.isOpen ? theme.transitions.duration.leavingScreen : theme.transitions.duration.enteringScreen})
  };

  return <Drawer
    sx={{
      ...sxDrawerCommon,
      flexShrink: 0,
      '& .MuiDrawer-paper': 
      {
        ...sxDrawerCommon,
        boxSizing: 'border-box'
      }
    }}
    variant="persistent"
    anchor="left"
    open={siteState.leftPanel.isOpen}
  >
    <List>
      <LeftSidebarItem path={paths.users()} title={'Пользователи'} icon={<PeopleIcon/>}/>
      <LeftSidebarItem path={paths.roles()} title={'Роли'} icon={<WorkspacePremiumIcon/>}/>
      <LeftSidebarItem path={paths.permissions()} title={'Разрешения'} icon={<PermDeviceInformationIcon/>}/>
      <LeftSidebarItem path={paths.groups()} title={'Группы'} icon={<GroupIcon/>}/>
      <LeftSidebarItem path={paths.positions()} title={'Должности'} icon={<ApprovalIcon/>}/>
      <Divider/>
      <LeftSidebarItem path={paths.dummy()} title={'Пустышка'} icon={<PsychologyAltIcon/>}/>   
    </List>
  </Drawer>
};