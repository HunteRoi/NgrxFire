import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetUser, Login, Logout } from './core/store/actions';
import { UserState } from './core/store/reducers/user.reducers';
import { selectUser } from './core/store/selectors';
import { State } from './core/store/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NgrxFire';

  user$: Observable<UserState>;

  constructor(private store: Store<State>) {
    this.user$ = this.store.select(selectUser);

    //this.store.dispatch(GetUser());
  }

  login() {
    this.store.dispatch(Login());
  }

  logout() {
    this.store.dispatch(Logout());
  }
}
