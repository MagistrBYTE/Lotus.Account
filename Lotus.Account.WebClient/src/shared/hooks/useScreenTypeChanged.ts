import { useLayoutEffect } from 'react';

/**
 * Хук для вызова функции в случае изменения размера или ориентации экрана
 * @param callback Вызываемая функция
 */
export const useScreenResizeOrOrientation = (callback:()=>void) =>
{
  const handleScreenResizeOrOrientation = () =>
  {
    callback();
  }

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenResizeOrOrientation);
    window.addEventListener('orientationchange', handleScreenResizeOrOrientation);

    callback();

    return () => 
    {
      window.removeEventListener('resize', handleScreenResizeOrOrientation);
      window.removeEventListener('orientationchange', handleScreenResizeOrOrientation);
    };
  }, [])
}