import { useEffect, useRef } from 'react'

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: Function, delay: number) => 
{
  const savedCallback = useRef<Function>()
  useEffect(() => 
  {
    savedCallback.current = callback
  }, [callback])

  // eslint-disable-next-line consistent-return
  useEffect(() => 
  {
    const handler = (...args: any) => savedCallback.current?.(...args)

    if (delay !== null) 
    {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
