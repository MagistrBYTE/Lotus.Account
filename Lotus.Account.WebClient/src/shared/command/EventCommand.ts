import { IRoute } from '../types/Route';
import { BaseCommand } from './Command';

/**
 * Класс команды для генерирования пользовательских событий
 */
export class EventCommand<TCommandParameter = any> extends BaseCommand<TCommandParameter>
{ 
  constructor(name: string) 
  {
    super(name);
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public override execute():void
  {
    const event = new Event('openModal');
    window.dispatchEvent(event);
  }

  /**
   * Метод определяющий возможность выполнения команды
   */
  public override canExecute(): boolean
  {
    return true;
  }
  
  /**
   * Статус выбора
   */
  public override isSelected():boolean
  {
    if(window.location.pathname === this.route?.path)
    {
      return true;
    }

    return false;
  }    
}