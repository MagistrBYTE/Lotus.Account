import { useAppSelector, RootState } from 'src/app/store'
import { IUser } from '../domain/User'
import { IUsersRequest } from '../api/UsersRequest'
import { IUserState } from './UserState'

export const useUserState = ():IUserState =>
{
  return useAppSelector((state: RootState) => state.user)
}

export const useUserStateViewUsers = ():IUser[]|undefined =>
{
  return useAppSelector((state: RootState) => state.user.viewUsers?.payload)
}

export const useUserStateFilterViewUsers = ():IUsersRequest|undefined =>
{
  return useAppSelector((state: RootState) => state.user.filterViewUsers)
}
