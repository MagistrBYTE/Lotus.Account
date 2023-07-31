import React from 'react';
import { toast } from 'react-toastify';
import { ToastErrorPanel } from './ToastErrorPanel';

export interface IToastErrorProps
{
  error: any;
  title: string;
}

export const toastError = (error: any, title: string) =>
{
  return toast.error(<ToastErrorPanel error={error} title={title} />);
};