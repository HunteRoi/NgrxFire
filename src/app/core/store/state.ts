import { Features } from "./features";
import * as fromUser from "./reducers/user.reducers";

export interface State {
  [Features.User]: fromUser.UserState;
}
