import { INavigationPath } from '../NavigationTypes';

export const getNavigationsByGroup = (value: any, group: string):INavigationPath[] =>
{
  const result:INavigationPath[] = [];
  for(const key in value)
  {
    const nav = value[key] as INavigationPath
    if(nav && nav.group && nav.group === group)
    {
      result.push(nav);
    }
  }

  return result;
}