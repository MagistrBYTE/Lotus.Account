import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'src/modules/auth';
import { localization } from 'src/resources/localization';
import { ToastWrapper, toastError } from 'src/ui/components/Feedback/Toast';

export interface IAutoLoginPageProps
{
  /**
   * Путь в случае успешного автоматического входа
   */
  pathSuccess: string;
}

export const AutoLoginPage: React.FC<IAutoLoginPageProps> = ({pathSuccess}:IAutoLoginPageProps) => 
{
  const [isLoading, setLoading] = useState(false);

  useEffect(() => 
  {
    setLoading(true);
    try
    {
      AuthService.LoginAuthCookie(pathSuccess);
      setLoading(false);
    }
    catch(error)
    {
      setLoading(false);
      const response = error as any;     
      toastError(response, localization.auth.authFailed);
    }
  }, []);

  return (
    <>
      <div>{localization.auth.authFailed}</div>
      <ToastWrapper />
    </>
  );
}