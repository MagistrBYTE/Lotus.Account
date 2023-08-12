
/**
 * Перечисление для типа данных токена для хранения в локальном хранилище
 */
export const TokenItemEnum = 
{
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
  ExpiresIn: 'ExpiresIn',
  UserId: 'UserId',
  UserLogin: 'UserLogin',
  UserName: 'UserName',
  UserSurname: 'UserSurname',
  UserFathersname: 'UserFathersname',
  UserRole: 'UserRole',
  UserPosition: 'UserPosition',
  UserGroup: 'UserGroup',
  UserPermissions: 'UserPermissions'
} as const;

/**
 * Тип данных токена для хранения в локальном хранилище
 */
export type TTokenItem = keyof typeof TokenItemEnum;
