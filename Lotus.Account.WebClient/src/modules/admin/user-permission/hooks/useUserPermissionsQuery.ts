import { useState } from 'react';
import { UserPermissionApi } from '../api/UserPermissionApiService';
import { IUserPermissionsRequest } from '../api/UserPermissionsRequest';
import { IUserPermissionsResponse } from '../api/UserPermissionsResponse';

const useUserPermissionsQuery = () => 
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IUserPermissionsResponse>();

  const refreshUserPermissions = (async (filter: IUserPermissionsRequest) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await UserPermissionApi.getUserPermissionsAsync(filter);

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
    refreshUserPermissions
  };
};

export default useUserPermissionsQuery;