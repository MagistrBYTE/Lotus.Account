import { useState } from 'react';
import { UserPositionApi } from '../api/UserPositionApiService';
import { IUserPositionsRequest } from '../api/UserPositionsRequest';
import { IUserPositionsResponse } from '../api/UserPositionsResponse';

const useUserPositionsQuery = () => 
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IUserPositionsResponse>();

  const refreshUserPositions = (async (filter: IUserPositionsRequest) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await UserPositionApi.getUserPositionsAsync(filter);

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
    refreshUserPositions
  };
};

export default useUserPositionsQuery;