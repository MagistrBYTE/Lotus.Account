import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';
import { PositionTable } from './components/PositionTable/PositionTable';

export const PositionsPage: React.FC = () => 
{
  return (
    <PageContainer>
      <PositionTable/>
    </PageContainer>
  );
};
