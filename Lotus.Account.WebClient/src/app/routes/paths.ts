type Id = string | number;

export const paths = {
  home: () => '/',

  // Авторизация и регистрация
  login: () => '/login',
  autoLogin: () => '/autoLogin',
  register: () => '/register',

  // Личные страницы
  profile: () => '/profile',
  messages: () => '/messages',
  notifications: () => '/notifications',
  configuration: () => '/configuration',

  // Управление
  users: () => '/users',
  user: (id: Id = ':id') => `/users/${id}`,
  userEdit: (id: Id = ':id') => `/users/${id}/edit`,

  roles: () => '/roles',
  role: (id: Id = ':id') => `/roles/${id}`,
  roleEdit: (id: Id = ':id') => `/roles/${id}/edit`,

  permissions: () => '/permissions',
  permission: (id: Id = ':id') => `/permissions/${id}`,
  permissionEdit: (id: Id = ':id') => `/permissions/${id}/edit`, 

  groups: () => '/groups',
  group: (id: Id = ':id') => `/groups/${id}`,
  groupEdit: (id: Id = ':id') => `/groups/${id}/edit`,   

  positions: () => '/positions',
  position: (id: Id = ':id') => `/positions/${id}`,
  positionEdit: (id: Id = ':id') => `/positions/${id}/edit`, 

  // Разное
  viewer3D: () => '/viewer3D',
  map: () => '/map',
  dummy: () => '/dummy'
};
