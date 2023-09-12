import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getErrorText } from 'src/shared/utils/errorThunk';
import { IUserState } from './UserState';
import { createUserAsyncThunk, getUserAsyncThunk, updateUserAsyncThunk, getUsersAsyncThunk } from './UserThunk';

const initialState: IUserState = {
  isLoading:false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    //
    // CREATE_USER
    //
    builder.addCase(createUserAsyncThunk.pending, (state, action) => 
    {
      state.isLoading = true;
      state.status = 'Создание пользователя...';
    });
    builder.addCase(createUserAsyncThunk.fulfilled, (state, action) => 
    {
      state.lastCreateUser = action.payload.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(createUserAsyncThunk.rejected, (state, action) => 
    {
      state.error = getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка создания пользователя';
    });

    //
    // GET_USER
    //
    builder.addCase(getUserAsyncThunk.pending, (state, action) => 
    {
      state.isLoading = true;
      state.status = 'Получение данных пользователя...';
    });
    builder.addCase(getUserAsyncThunk.fulfilled, (state, action) => 
    {
      state.lastViewUser = action.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(getUserAsyncThunk.rejected, (state, action) => 
    {
      state.error = getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка получение данных пользователя';
    });
    
    //
    // UPDATE_USER
    //
    builder.addCase(updateUserAsyncThunk.pending, (state, action) => 
    {
      state.isLoading = true;
      state.status = 'Обновление данных пользователя...';
    });
    builder.addCase(updateUserAsyncThunk.fulfilled, (state, action) => 
    {
      state.lastUpdateUser = action.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(updateUserAsyncThunk.rejected, (state, action) => 
    {
      state.error = getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка обновления данных пользователя';
    });
    
    //
    // GET_USERS
    //
    builder.addCase(getUsersAsyncThunk.pending, (state, action) => 
    {
      state.isLoading = true;
      state.status = 'Получение данных пользователей...';
    });
    builder.addCase(getUsersAsyncThunk.fulfilled, (state, action) => 
    {
      state.viewUsers = action.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(getUsersAsyncThunk.rejected, (state, action) => 
    {
      state.error = getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка получения данных пользователя';
    });      
  }
});
