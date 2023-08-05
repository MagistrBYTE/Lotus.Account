import { Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TokenHelper } from 'src/shared/auth/TokenHelper';

export const ProfilePage: React.FC = () => 
{
  const [isEdit, setEdit] = useState(false);
  
  return (
    <Container maxWidth='xl'>
      <Card>
        <CardContent>
          <Typography variant='h5' mb={2} >
            Идентификация
          </Typography>
          <Stack spacing={2} direction={'row'}>
            <Stack spacing={2} direction={'column'} justifyContent={'flex-start'} >
              <TextField size='small' label="ID" value={TokenHelper.getUserId()} />
              <TextField size='small' label="Login" value={TokenHelper.getUserLogin()} />
              <TextField size='small' label="E-mail" value={TokenHelper.getUserLogin()} />
            </Stack>
            <Stack spacing={2} direction={'column'} >
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};