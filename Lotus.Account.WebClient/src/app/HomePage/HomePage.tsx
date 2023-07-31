import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../routes/paths';

export const HomePage: React.FC = () => 
{
  return (
    <div>
        Модуль управления пользователями
      <div>
        <Link to={paths.login()} >Страница входа</Link>
      </div>
      <div>
        <Link to={paths.profile()} >Страница профиля</Link>
      </div>
      <div>
        <Link to={paths.dummy()} >Страница проверок</Link>
      </div>
      <div>
        <Link to={paths.positions()} >Страница постов</Link>
      </div>
      <div>
        <Link to={paths.viewer3D()} >Страница 3D</Link>
      </div>
    </div>
  );
};