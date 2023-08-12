import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';
import { PermissionTable } from './components/PermissionTable';

export const PermissionsPage: React.FC = () => 
{
  return (
    <PageContainer>
      <PermissionTable/>
    </PageContainer>
  );
};