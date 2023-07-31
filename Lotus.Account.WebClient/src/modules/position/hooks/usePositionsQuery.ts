import { useState } from 'react';
import { PositionApi } from '../api/PositionApiService';
import { IPositionsRequest } from '../api/PositionsRequest';
import { IPositionsResponse } from '../api/PositionsResponse';

const usePositionsQuery = () => 
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IPositionsResponse>();

  const refreshPositions = (async (filter: IPositionsRequest) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await PositionApi.getPositionsAsync(filter);

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
    refreshPositions
  };
};

export default usePositionsQuery;