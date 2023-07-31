import { Container } from '@mui/material';
import React from 'react';
import { PermissionTable } from './components/PermissionTable';

export const PermissionsPage: React.FC = () => 
{
  return (
    <Container>
      <PermissionTable/>
    </Container>
  );
};