import React from 'react';
import { Container } from '@mui/material';
import { PositionTable } from './components/PositionTable/PositionTable';

export const PositionsPage: React.FC = () => 
{
  return (
    <Container>
      <PositionTable/>
    </Container>
  );
};
