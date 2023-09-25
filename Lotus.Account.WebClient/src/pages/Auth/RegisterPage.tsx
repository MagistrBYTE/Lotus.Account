import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Box, Typography, TextField } from '@mui/material';
import { ToastWrapper, toastError } from 'src/ui/components/Feedback/Toast';
import { AuthService, IRegisterParameters } from 'src/modules/auth';
import { localization } from 'src/resources/localization';

export interface IRegisterPageProps
{
  /**
   * Путь в случае успешной регистрации
   */  
  pathSuccess: string;
}

export const RegisterPage: React.FC<IRegisterPageProps> = ({pathSuccess}:IRegisterPageProps) => 
{
  const [isLoading, setLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledRegister, setDisabledRegister] = useState(true);

  const handleLoginChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setLogin(event.target.value);
    invalidLogin(event.target.value, password);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setEmail(event.target.value);
  }; 

  const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setPassword(event.target.value);
    invalidLogin(login, event.target.value);
  };

  const handleButtonRegistration = async () =>  
  {
    setLoading(true);
    try
    {
      const registerParams: IRegisterParameters = 
      {
        login: login,
        email: email,
        password: password
      };

      await AuthService.Register(registerParams, pathSuccess);
    }
    catch(error)
    {
      setLoading(false);
      const response = error as any;     
      toastError(response, localization.auth.registrationFailed);
    }
  };

  const invalidLogin =(login: string, password: string) =>
  {
    if(login.length > 3 && password.length > 3)
    {
      setDisabledRegister(false);
    }
    else
    {
      setDisabledRegister(true);
    }
  }  

  return (
    <Container maxWidth={'sm'}>
      <Stack >
        <Box sx={{m: 2, p: 2,  alignSelf: 'center'}}>
          <Typography component="h1" variant="h5">
            {localization.auth.registration}
          </Typography>
        </Box>
        <TextField 
          value={login}
          onChange={handleLoginChange}
          margin='normal'
          required
          fullWidth
          id="login"
          label="Login"
          name="login"
          autoFocus
        />
        <TextField 
          value={email}
          onChange={handleEmailChange}
          margin='normal'
          required
          fullWidth
          type='email'
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />        
        <TextField
          value={password}
          onChange={handlePasswordChange}
          margin='normal'
          required
          fullWidth
          name="password"
          label={localization.auth.password}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <LoadingButton
          disabled={disabledRegister}
          loading={isLoading}
          fullWidth
          variant="contained"
          onClick={handleButtonRegistration}
          sx={{ mt: 3, mb: 2 }}
        >
          {localization.auth.register}
        </LoadingButton>
      </Stack>
      <ToastWrapper/>
    </Container>
  );
}