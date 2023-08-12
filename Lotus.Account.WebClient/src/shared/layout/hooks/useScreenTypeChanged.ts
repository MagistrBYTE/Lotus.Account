import { useLayoutEffect } from 'react';
import { useAppDispatch } from 'src/app/store';
import { TScreenType } from '../domain/ScreenType';
import { setScreenTypeAction } from '../store/LayoutActions';

export const useScreenTypeChanged = () =>
{
  const isDesktopQuery = '(min-width: 1280px)';
  const isPortraitQuery = '(orientation: portrait)';

  const dispacth = useAppDispatch();

  const handleScreenTypeChange = () =>
  {
    const isDesktop = window.matchMedia(isDesktopQuery).matches;
    const isPortrait = window.matchMedia(isPortraitQuery).matches;

    if(isPortrait)
    {
      dispacth(setScreenTypeAction(TScreenType.Portrait));
      console.log(`Set type screen = ${TScreenType.Portrait}`);
    }
    else
    {
      if(isDesktop)
      {
        dispacth(setScreenTypeAction(TScreenType.Desktop));
        console.log(`Set type screen = ${TScreenType.Desktop}`);
      }
      else
      {
        dispacth(setScreenTypeAction(TScreenType.Landscape));
        console.log(`Set type screen = ${TScreenType.Landscape}`);
      }
    }
  }

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenTypeChange);
    window.addEventListener('orientationchange', handleScreenTypeChange);

    return () => 
    {
      window.removeEventListener('resize', handleScreenTypeChange);
      window.removeEventListener('orientationchange', handleScreenTypeChange);
    };
  }, [])
}