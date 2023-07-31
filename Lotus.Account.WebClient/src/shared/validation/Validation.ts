import { IValidationResult } from './ValidationResult';

/**
 * Интерфейс для определения валидации
 */
export interface IValidation
{
    validation:(value: any|null) => IValidationResult;
}