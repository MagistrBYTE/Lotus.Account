import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Box, Typography, TextField } from '@mui/material';
import { ToastWrapper } from 'src/ui/components/Alert/Toast';
import { localization } from 'src/resources/localization';

export interface IRestorePasswordPageProps
{
  /**
   * Путь в случае успешной отправки письма
   */  
  pathSuccess: string;
}

export const RestorePasswordPage: React.FC<IRestorePasswordPageProps> = ({pathSuccess}:IRestorePasswordPageProps) => 
{
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');


  const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setEmail(event.target.value);
  };

  const handleButtonRestorePassword = async () =>  
  {

  }; 

  return (
    <Container maxWidth={'sm'}>
      <Stack >
        <Box sx={{m: 2, p: 2,  alignSelf: 'center'}}>
          <Typography component="h1" variant="h5">
            {localization.auth.restorePassword}
          </Typography>
        </Box>
        <TextField 
          value={email}
          onChange={handleEmailChange}
          type='email'
          margin='normal'
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <LoadingButton
          loading={isLoading}
          fullWidth
          variant="contained"
          onClick={handleButtonRestorePassword}
          sx={{ mt: 3, mb: 2 }}
        >
          {localization.auth.send}
        </LoadingButton>
      </Stack>
      <ToastWrapper/>
    </Container>
  );
}