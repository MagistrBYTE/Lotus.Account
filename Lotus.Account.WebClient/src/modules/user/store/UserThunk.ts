import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from '../api/UserApiService';
import { IUser } from '../domain/User';
import { IUserCreateRequest } from '../api/UserCreateRequest';
import { IUsersRequest } from '../api/UsersRequest';
import { IUsersResponse } from '../api/UsersResponse';
import { IUserResponse } from '../api/UserResponse';
import { CREATE_USER, GET_USER, UPDATE_USER, REMOVE_USER, GET_USERS } from './UserActions';


export const createUserAsyncThunk = createAsyncThunk<IUserResponse, IUserCreateRequest>(
  CREATE_USER,
  async (registerParams) => 
  {
    const response = await UserApi.createUserAsync(registerParams);
    return response;
  }
);

export const getUserAsyncThunk = createAsyncThunk<IUser, string>(
  GET_USER,
  async (id) => 
  {
    const response = await UserApi.getUserAsync(id);
    return response;
  }
);

export const updateUserAsyncThunk = createAsyncThunk<IUser, IUser>(
  UPDATE_USER,
  async (updatedUser) => 
  {
    const response = await UserApi.updateUserAsync(updatedUser);
    return response;
  }
);

export const removeUserAsyncThunk = createAsyncThunk<boolean, string>(
  REMOVE_USER,
  async (id) => 
  {
    const response = await UserApi.removeUserAsync(id);
    return response;
  }
);

export const getUsersAsyncThunk = createAsyncThunk<IUsersResponse, IUsersRequest>(
  GET_USERS,
  async (filter) => 
  {
    const response = await UserApi.getUsersAsync(filter);
    return response;
  }
);