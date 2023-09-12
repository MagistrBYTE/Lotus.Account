import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';
import { UserPositionTable } from 'src/widgets/admin/user-position/UserPositionTable';

export const UserPositionsPage: React.FC = () => 
{
  return (
    <PageContainer>
      <UserPositionTable/>
    </PageContainer>
  );
};
