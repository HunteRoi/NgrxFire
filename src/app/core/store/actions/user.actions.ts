import { createAction, props } from "@ngrx/store";

import { User } from "../../models";

const UserActionTypes = {
	Get: '[User] Get',
  Authenticated: '[User] Authenticated',
  NotAuthenticated: '[User] Not Authenticated',
  Login: '[User] Login',
  Logout: '[User] Logout',
  Error: '[User] Error'
}

export const GetUser = createAction(UserActionTypes.Get);
export const Authenticated = createAction(UserActionTypes.Authenticated, props<User>());
export const NotAuthenticated = createAction(UserActionTypes.NotAuthenticated);
export const Login = createAction(UserActionTypes.Login);
export const Logout = createAction(UserActionTypes.Logout);
export const Error = createAction(UserActionTypes.Error, props<{ error: string }>());
