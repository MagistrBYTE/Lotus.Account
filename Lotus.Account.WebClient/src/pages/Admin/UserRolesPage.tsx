import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';
import { UserRoleTable } from 'src/widgets/admin/user-role/UserRoleTable';

export const UserRolesPage: React.FC = () => 
{
  return (
    <PageContainer>
      <UserRoleTable/>
    </PageContainer>
  );
};