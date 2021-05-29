import { createReducer, on } from "@ngrx/store";

import { User } from "../../models";
import * as UserActions from '../actions/user.actions';

export interface UserState extends User {
  loading: boolean;
  error?: string | null;
}

const defaultUser: User = {
  email: null,
  uid: null,
  photoURL: null,
  displayName: 'Guest'
}

const initialState: UserState = {
  loading: false,
  error: null,
  ...defaultUser,
  displayName: null
};

export const reducer = createReducer<UserState>(
  initialState,
  on(UserActions.GetUser, (state) => ({ ...state, loading: true })),
  on(UserActions.Authenticated, (state, user) => ({...state, ...user, loading: false })),
  on(UserActions.NotAuthenticated, (state) => ({ ...state, ...defaultUser, loading: false })),
  on(UserActions.Login, (state) => ({ ...state, loading: true })),
  on(UserActions.Logout, (state) => ({ ...state, ...defaultUser, loading: true })),
  on(UserActions.Error, (state, { error } ) => ({ ...state, error, loading: false }))
);