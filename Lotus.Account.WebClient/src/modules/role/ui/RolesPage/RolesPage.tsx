import { Container } from '@mui/material';
import React from 'react';
import { RoleTable } from './components/RoleTable';

export const RolesPage: React.FC = () => 
{
  return (
    <Container>
      <RoleTable/>
    </Container>
  );
};