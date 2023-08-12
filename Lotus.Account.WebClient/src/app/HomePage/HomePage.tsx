import React from 'react';
import { Link } from 'react-router-dom';
import { accountNavigation } from 'src/shared/account/accountNavigation';
import { authNavigation } from 'src/shared/auth';
import { mainNavigations } from '../mainNavigations';

export const HomePage: React.FC = () => 
{
  return (
    <div>
        Модуль управления пользователями
      <div>
        <Link to={authNavigation.login.path} >Страница входа</Link>
      </div>
      <div>
        <Link to={accountNavigation.profile.path} >Страница профиля</Link>
      </div>
      <div>
        <Link to={mainNavigations.dummy.path} >Страница проверок</Link>
      </div>
      <div>
        <Link to={mainNavigations.positions.path} >Страница постов</Link>
      </div>
    </div>
  );
};