import { useState } from 'react';
import { UserRoleApi } from '../api/UserRoleApiService';
import { IUserRolesRequest } from '../api/UserRolesRequest';
import { IUserRolesResponse } from '../api/UserRolesResponse';

const useUserRolesQuery  = () => 
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IUserRolesResponse>();

  const refreshUserRoles = (async (filter: IUserRolesRequest) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await UserRoleApi.getUserRolesAsync(filter);

      setResponse(response);
      setIsLoading(false);
    } 
    catch (exc) 
    {
      setIsLoading(false);
    }
  });

  return {
    isLoading,
    response,
    refreshUserRoles
  };
};

export default useUserRolesQuery;