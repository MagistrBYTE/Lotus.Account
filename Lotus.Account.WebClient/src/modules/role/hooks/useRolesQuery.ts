import { useState } from 'react';
import { RoleApi } from '../api/RoleApiService';
import { IRolesRequest } from '../api/RolesRequest';
import { IRolesResponse } from '../api/RolesResponse';

const useRolesQuery  = () => 
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IRolesResponse>();

  const refreshRoles = (async (filter: IRolesRequest) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await RoleApi.getRolesAsync(filter);

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
    refreshRoles
  };
};

export default useRolesQuery;