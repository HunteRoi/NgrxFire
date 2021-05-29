import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';

import { User } from '../models';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
	user: Observable<User | undefined | null>;

	constructor(
		private afAuth: AngularFireAuth,
		private userService: UserService
	) {
		this.user = this.afAuth.authState.pipe(
			switchMap((usr) => {
				if (usr) {
					return userService.getUserById(usr.uid).valueChanges();
				} else {
					return of(null);
				}
			}),
		);
	}

	async signIn() {
		const provider = new firebase.auth.GoogleAuthProvider();
		const credential = await this.afAuth.signInWithPopup(provider);
		return this.updateUserData(credential.user);
	}

	private updateUserData(user: firebase.User | null) {
		if (user == null) return null;

		// Sets user data to firestore on login
		const userRef = this.userService.getUserById(user.uid);

		const data = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
		};

		return userRef.set(data as User, { merge: true });
	}

	async signOut() {
		await this.afAuth.signOut();
	}
}
