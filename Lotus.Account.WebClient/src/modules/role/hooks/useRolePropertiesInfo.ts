import { useEffect, useState } from 'react';
import { ISelectOption } from 'src/core/types/SelectOption';
import { PermissionApi } from 'src/modules/permission';
import { RoleProperties, RolePropertiesInfo } from '../domain/RolePropertiesInfo';

export const useRolePropertiesInfo = ():RolePropertiesInfo => 
{
  const [permissionOptions, setPermissionOptions] = useState<ISelectOption[]>([]);

  useEffect(() => 
  {
    const response = PermissionApi.getPermissionsAsOptionsAsync();
    response.then((value)=>
    {
      setPermissionOptions(value);
    })
  }, []);

  const prop = RoleProperties.getPropertyDescriptorByName('permissionIds');
  prop.options = permissionOptions;

  return RoleProperties;
};