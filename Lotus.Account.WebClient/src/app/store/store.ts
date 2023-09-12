import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { userSlice } from 'src/modules/admin/user';
import { userNotificationSlice } from 'src/modules/account/user-notifications';
import { layoutSlice } from '../layout';


export function makeStore() 
{
  return configureStore(
    {
      reducer: 
      { 
        layout: layoutSlice.reducer,
        user: userSlice.reducer,
        userNotification: userNotificationSlice.reducer
      }
    })
}

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {auth: AuthState, form: FormState, weather: WeatherState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>