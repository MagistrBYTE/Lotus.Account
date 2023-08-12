import { Container } from '@mui/material';
import React from 'react';
import { TScreenType, getLayoutBreakpoints, useLayoutState } from 'src/shared/layout';
import { PageContainer } from 'src/ui/components/Layout';
import { GroupTable } from './components/GroupTable';
import { GroupList } from './components/GroupList';

export const GroupsPage: React.FC = () => 
{
  const isDesktop = useLayoutState().screenType === TScreenType.Desktop;

  return (
    <PageContainer>
      {isDesktop && <GroupTable/>}
      {!isDesktop && <GroupList/>}
    </PageContainer>
  );
};