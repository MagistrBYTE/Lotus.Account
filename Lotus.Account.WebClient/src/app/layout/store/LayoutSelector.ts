import { RootState, useAppSelector } from 'src/app/store';
import { ILayoutState } from './LayoutState';

export const useLayoutState = ():ILayoutState =>
{
  return useAppSelector((state: RootState) => state.layout)
}
