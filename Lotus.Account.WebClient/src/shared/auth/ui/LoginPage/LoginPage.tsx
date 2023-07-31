import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Checkbox, Container, FormControlLabel, Link, Stack, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { ToastWrapper, toastError } from 'src/ui/components/Info/Toast';
import { localization } from 'src/shared/localization';
import { AuthApi } from '../../AuthApiService';
import { instanceOfSuccessAuthResponse } from '../../SuccessAuthResponse';
import { TokenHelper } from '../../TokenHelper';

export interface ILoginPageProps
{
  /**
   * Путь в случае успешного входа
   */  
  pathSuccess: string;
}

export const LoginPage: React.FC<ILoginPageProps> = ({pathSuccess}:ILoginPageProps) => 
{
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remembeMe, setRemembeMe] = useState(false);
  const [disabledLogin, setDisabledLogin] = useState(true);

  const handleLoginChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setLogin(event.target.value);
    invalidLogin(event.target.value, password);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setPassword(event.target.value);
    invalidLogin(login, event.target.value);
  };

  const handleSetRemembeMe = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => 
  {
    setRemembeMe(checked);
  }; 

  const handleButtonLogin = async () =>  
  {
    setLoading(true);
    try
    {
      const response = await AuthApi.Login(login, password);
      if(response)
      {
        setLoading(false);
        const data = instanceOfSuccessAuthResponse(response.data);
        if (data) 
        {
          TokenHelper.setData(data);

          if(remembeMe)
          {
            AuthApi.SetAuthCookie(login, password);
          }

          navigate(pathSuccess);
        }
      }
    }
    catch(error)
    {
      setLoading(false);
      const response = error as any;     
      toastError(response, localization.auth.authFailed);
    }
  };

  const invalidLogin =(login: string, password: string) =>
  {
    if(login.length > 3 && password.length > 3)
    {
      setDisabledLogin(false);
    }
    else
    {
      setDisabledLogin(true);
    }
  }

  return (
    <Container maxWidth={'sm'}>
      <Stack >
        <Box sx={{m: 2, p: 2,  alignSelf: 'center'}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {localization.auth.entrance}
          </Typography>
        </Box>
        <TextField 
          value={login}
          onChange={handleLoginChange}
          margin='normal'
          required
          fullWidth
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" onChange={handleSetRemembeMe} />}
          label={localization.auth.remember}
        />
        <LoadingButton
          disabled={disabledLogin}
          loading={isLoading}
          fullWidth
          variant="contained"
          onClick={handleButtonLogin}
          sx={{ mt: 3, mb: 2 }}
        >
          {localization.auth.comeIn}
        </LoadingButton>
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Link href="#">
            <Typography>
              {localization.auth.forgotPassword}
            </Typography>
          </Link>
          <Link href="#">
            <Typography>
              {localization.auth.register}
            </Typography>
          </Link>
        </Stack>
      </Stack>
      <ToastWrapper/>
    </Container>
  );
}