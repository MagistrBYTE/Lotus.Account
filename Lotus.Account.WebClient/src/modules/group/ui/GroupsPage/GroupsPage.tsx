import { Container } from '@mui/material';
import React from 'react';
import { TScreenType, useLayoutBreakpoints, useLayoutState } from 'src/shared/layout';
import { GroupTable } from './components/GroupTable';
import { GroupList } from './components/GroupList';

export const GroupsPage: React.FC = () => 
{
  const isDesktop = useLayoutState().screenType === TScreenType.Desktop;

  return (
    <Container maxWidth={useLayoutBreakpoints()}>
      {isDesktop && <GroupTable/>}
      {!isDesktop && <GroupList/>}
    </Container>
  );
};