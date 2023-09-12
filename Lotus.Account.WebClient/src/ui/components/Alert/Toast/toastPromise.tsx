import React from 'react';
import { ToastOptions, toast } from 'react-toastify';
import { ToastErrorPanel } from './ToastErrorPanel';


export const toastPromise = <TData,>(promise: Promise<TData> | (() => Promise<TData>), 
  textPending: string,
  textSuccess: string,
  textFailed: string,
  options?: ToastOptions): Promise<TData>=>
{
  return toast.promise(promise, 
    {
      pending: textPending,
      success: textSuccess,
      error: 
      {
        render({data})
        {
          return <ToastErrorPanel error={data} title={textFailed}/>
        }
      }
    }, options);
}