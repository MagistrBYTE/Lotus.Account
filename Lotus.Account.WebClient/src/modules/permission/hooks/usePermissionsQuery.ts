import { useState } from 'react';
import { PermissionApi } from '../api/PermissionApiService';
import { IPermissionsRequest } from '../api/PermissionsRequest';
import { IPermissionsResponse } from '../api/PermissionsResponse';

const usePermissionsQuery = () => 
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IPermissionsResponse>();

  const refreshPermissions = (async (filter: IPermissionsRequest) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await PermissionApi.getPermissionsAsync(filter);

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
    refreshPermissions
  };
};

export default usePermissionsQuery;