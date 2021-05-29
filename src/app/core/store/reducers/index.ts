import { ActionReducerMap } from '@ngrx/store';
import { Features } from '../features';
import { State } from '../state';

import * as fromUser from './user.reducers';

export const reducers: ActionReducerMap<State> = {
  [Features.User]: fromUser.reducer
};
