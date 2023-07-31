import { Breakpoint } from '@mui/material';
import { RootState, useAppSelector } from 'src/app/store';

/**
 * Получение оптимальной точки Breakpoint для текущей ширины
 * @returns 
 */
export const useLayoutBreakpoints = ():Breakpoint =>
{
  if(screen.width > 1800)
  {
    return 'xl';
  }

  return 'lg';
}
