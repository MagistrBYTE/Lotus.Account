import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastWrapper, toastError } from 'src/ui/components/Info/Toast';
import { localization } from 'src/shared/localization';
import { AuthApi } from '../../AuthApiService';
import { instanceOfSuccessAuthResponse } from '../../SuccessAuthResponse';
import { TokenHelper } from '../../TokenHelper';

export interface IAutoLoginPageProps
{
  /**
   * Путь в случае успешного автоматического входа
   */
  pathSuccess: string;
}

export const AutoLoginPage: React.FC<IAutoLoginPageProps> = ({pathSuccess}:IAutoLoginPageProps) => 
{
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => 
  {
    setLoading(true);
    const promise = AuthApi.LoginAuthCookie();
    promise
      .then((response) => 
      {
        if (response) 
        {
          setLoading(false);
          const data = instanceOfSuccessAuthResponse(response.data);
          if (data) 
          {
            TokenHelper.setData(data);
            navigate(pathSuccess);
          }
        }
      })
      .catch((error) => 
      {
        setLoading(false);
        const response = error as any;
        toastError(response, localization.auth.authFailed);
      });
  }, []);

  return (
    <>
      <div>{localization.auth.authFailed}</div>
      <ToastWrapper />
    </>
  );
}