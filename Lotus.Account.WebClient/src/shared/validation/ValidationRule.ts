import { IValidationResult, ValidationResultSuccess } from './ValidationResult';

/**
 * Интерфейс для определения правила валидации
 */
export interface IValidationRule<TValue = any>
{
    validation:(value: TValue|null) => IValidationResult;
}

export class ValidationSuccess<TValue = any> implements IValidationRule<TValue>
{
  validation(value: TValue|null):IValidationResult
  {
    return ValidationResultSuccess;
  }
}