import { useEffect, useState } from 'react';
import { ISelectOption } from 'src/shared/types/SelectOption';
import { UserRoleObjectInfo, UserRoleObjectInfoClass } from '../domain/UserRoleObjectInfo';
import { UserPermissionApi } from '../../user-permission';


export const useUserRoleObjectInfo = ():UserRoleObjectInfoClass => 
{
  const [permissionOptions, setUserPermissionOptions] = useState<ISelectOption[]>([]);

  useEffect(() => 
  {
    const response = UserPermissionApi.getUserPermissionsAsOptionsAsync();
    response.then((value)=>
    {
      setUserPermissionOptions(value);
    })
  }, []);

  const prop = UserRoleObjectInfo.getPropertyByName('permissionIds');
  prop.options = permissionOptions;

  return UserRoleObjectInfo;
};