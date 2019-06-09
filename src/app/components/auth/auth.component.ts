import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.userObservable.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  signInSuccess(): void {
    this.authService.setUser(this.user);
    this.router.navigate(['/']);
  }
}
