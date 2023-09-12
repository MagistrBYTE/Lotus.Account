import * as React from 'react';
import { IRoute } from 'src/shared/types/Route';
import { RoutePermission } from 'src/app/routes';
import { localization } from 'src/resources/localization';
import { IMainLayoutProps, MainLayout } from './MainLayout';

export interface IMainLayoutPermissionProps extends IMainLayoutProps, IRoute
{

}

export const MainLayoutPermission: React.FC<IMainLayoutPermissionProps> = (props:IMainLayoutPermissionProps) => 
{
  const {page, path, isShouldBeAuthorized, permissions } = props;

  return <RoutePermission 
    component={<MainLayout page={page} />}
    accessDenied={<MainLayout page={<>{localization.auth.accessDenied}</>}/>}
    isShouldBeAuthorized={isShouldBeAuthorized}
    permissions={permissions}/>
};
