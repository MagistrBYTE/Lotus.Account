import { IRoute } from '../types/Route';

/**
 * Интерфейс команды
 * @description Команда предоставляет собой концепцию (паттерн) для связывания логики выполнения действия и визуального элемента. 
 * Как паттерн, команда позволяет инкапсулировать запрос на выполнение определенного действия в виде отдельного объекта
 */
export interface ICommand<TCommandParameter = any>
{
  //
  // ОСНОВНЫЕ ДАННЫЕ
  //
  /**
   * Имя команды
   */
  name: string;

  /**
   * Параметр команды
   */
  parameter?: TCommandParameter;

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  execute():void;

  /**
   * Метод определяющий возможность выполнения команды
   */
  canExecute(): boolean;

  /**
   * Статус выбора
   */
  isSelected():boolean;

  //
  // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
  //
  /**
   * Маршрут команды 
   */
  route?: IRoute;

  //
  // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
  //
  /**
   * Надпись
   */
  label: string;

   /**
   * Иконка
   */
   icon?: React.ReactNode;

  /**
   * Порядок при сортировке команд
   */
  order?: number;

  /**
   * Группа к которой относиться команда
   */
  group?: string;  
}

/**
 * Базовый класс команды
 */
export class BaseCommand<TCommandParameter = any> implements ICommand<TCommandParameter>
{
  //
  // ОСНОВНЫЕ ДАННЫЕ
  //
  /**
   * Имя команды
   */
  name: string;

  /**
   * Параметр команды
   */
  parameter?: TCommandParameter;

  //
  // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
  //
  /**
   * Маршрут команды 
   */
  route?: IRoute;

  //
  // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
  //
  /**
   * Надпись
   */
  label: string;

  /**
   * Иконка
   */
  icon?: React.ReactNode;

  /**
   * Порядок при сортировке команд
   */
  order?: number;

  /**
   * Группа к которой относиться команда
   */
  group?: string;
  
  constructor(name: string) 
  {
    this.name = name;
    this.label = '';
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public execute():void
  {

  }

  /**
   * Метод определяющий возможность выполнения команды
   */
  public canExecute(): boolean
  {
    return true;
  }
  
  /**
   * Статус выбора
   */
  public isSelected():boolean
  {
    return false;
  }  
}