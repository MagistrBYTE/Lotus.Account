import { Link, Typography } from '@mui/material';
import React from 'react';
import { PageContainer } from 'src/ui/components/Layout';

export const AboutPage: React.FC = () => 
{
  return (
    <PageContainer>
      <Typography variant='h6'>
      Добро пожаловать в игровой мир Sentra
      </Typography> 
    </PageContainer>
  );
};