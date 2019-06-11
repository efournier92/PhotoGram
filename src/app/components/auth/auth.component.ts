import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  signInSuccess(): void {
    this.router.navigate(['/']);
  }
}
