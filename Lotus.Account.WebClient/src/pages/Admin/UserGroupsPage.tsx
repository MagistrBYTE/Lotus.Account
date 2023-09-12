import React from 'react';
import { TScreenType, useLayoutState } from 'src/app/layout';
import { PageContainer } from 'src/ui/components/Layout';
import { UserGroupList } from 'src/widgets/admin/user-group/UserGroupList';
import { UserGroupTable } from 'src/widgets/admin/user-group/UserGroupTable';


export const UserGroupsPage: React.FC = () => 
{
  const isDesktop = useLayoutState().screenType === TScreenType.Desktop;

  return (
    <PageContainer>
      {isDesktop && <UserGroupTable/>}
      {!isDesktop && <UserGroupList/>}
    </PageContainer>
  );
};