import React from 'react';

type Id = string | number;

/**
 * Базовый интерфейс для навигации по сайту
 */
export interface INavigationBase extends Record<string, any>
{
   /**
   * Иконка
   */
  icon?: React.ReactNode;

  /**
   * Надпись
   */
  label: string;

  /**
   * Должен ли он быть авторизован для доступа к данному ресурсу
   */
  isShouldBeAuthorized?: boolean;

  /**
   * Набор разрешений для доступак данному ресурсу
   */
  permissions?: string[];

  /**
   * Порядок при сортировке элементов списка навигации
   */
  order?: number;

  /**
   * Группа к которой относиться данный элемент навигации
   */
  group?: string;    
}

/**
 * Интерфейс для навигации по сайту по простому пути
 */
export interface INavigationPath extends INavigationBase
{
  /**
   * Путь
   */
  path: string;
}

/**
 * Интерфейс для навигации по сайту по пути с идентификатором
 */
export interface INavigationPathById extends INavigationBase
{
  /**
   * Путь
   */
  path: (id: Id) => string
}