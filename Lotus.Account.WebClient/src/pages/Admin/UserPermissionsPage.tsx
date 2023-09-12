import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';
import { UserPermissionTable } from 'src/widgets/admin/user-permission/UserPermissionTable';

export const UserPermissionsPage: React.FC = () => 
{
  return (
    <PageContainer>
      <UserPermissionTable/>
    </PageContainer>
  );
};