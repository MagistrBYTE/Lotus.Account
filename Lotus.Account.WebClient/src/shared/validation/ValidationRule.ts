import { IValidationResult, ValidationResultSuccess } from './ValidationResult';

/**
 * Интерфейс для определения правила валидации
 */
export interface IValidationRule
{
    validation:(value: any|null) => IValidationResult;
}

export class ValidationSuccess implements IValidationRule
{
  validation(value: any):IValidationResult
  {
    return ValidationResultSuccess;
  }
}