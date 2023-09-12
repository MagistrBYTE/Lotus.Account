import { Link, Typography } from '@mui/material';
import React from 'react';
import { routes } from 'src/app/routes';
import { TokenHelper } from 'src/modules/auth';
import { PageContainer } from 'src/ui/components/Layout';

export const HomePage: React.FC = () => 
{
  const isAuth = TokenHelper.isAccessToken();
  return (
    <PageContainer>
      <Typography variant='h6'>
      Добро пожаловать в игровой мир Sentra
      </Typography>      
      {isAuth &&
      <>
        <Typography variant='body1'>
          До начала игры вы должны создать персонажей
        </Typography>
        <Typography variant='body1'>
          Вы можете создать новую игру или продолжить существующую
        </Typography>
        <Typography variant='body1'>
          Весь игровой процесс автоматически сохраняется после любого игрового действия
        </Typography>
      </>}
      {!isAuth &&
      <>
        <Typography variant='body1'>
          Для игры вы должны <Link href={routes.login.path}>войти</Link> или <Link href={routes.register.path}>зарегистрироваться</Link>
        </Typography>
      </>}
    </PageContainer>
  );
};