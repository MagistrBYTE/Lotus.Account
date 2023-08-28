import { actions } from './Common/actions';
import { common } from './Common/common';
import { filtres } from './Common/filtres';
import { validation } from './Common/validation';

import { auth } from './Account/auth';
import { configuration } from './Account/configuration';
import { group } from './Account/group';
import { notification } from './Account/notification';
import { permission } from './Account/permission';
import { position } from './Account/position';
import { profile } from './Account/profile';
import { role } from './Account/role';
import { user } from './Account/user';

import { person } from './Game/person';
import { map } from './Game/map';

export const ruLocale = {
  // Common
  actions,
  common,
  filtres,
  validation,

  // Account
  auth, 
  configuration,
  group,
  notification,
  permission,
  position,
  profile,
  role,
  user,
  
  // Game
  person,
  map
};
