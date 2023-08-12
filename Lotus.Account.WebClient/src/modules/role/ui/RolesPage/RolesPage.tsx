import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';
import { RoleTable } from './components/RoleTable';

export const RolesPage: React.FC = () => 
{
  return (
    <PageContainer>
      <RoleTable/>
    </PageContainer>
  );
};