import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../components/auth/user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObj: AngularFireObject<User>;
  user: User;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
  ) {
    this.angularFireAuth.authState.subscribe(
      authData => this.getUser(authData)
    )
  }

  getUser(authData: any): AngularFireObject<User> {
    if (!authData || !authData.uid) return;
    this.userObj = this.db.object(`users/${authData.uid}`);
    this.userObj.valueChanges().subscribe(
      (user: User) => {
        this.setUser(user, authData);
      }
    )
  }

  createUser(authData: any) {
    let user: User = new User(authData);
    this.userObj.update(user);
  }

  private userSource = new BehaviorSubject({});
  userObservable = this.userSource.asObservable();

  updateUser(user: User): void {
    this.userSource.next(user);
    this.db.object(`users/${user.id}`).update(user);
  }

  setUser(user: User, authData?: any) {
    if (!user) {
      this.createUser(authData);
    } else {
      this.user = user;
    }
    this.updateUser(this.user);
  }
}
