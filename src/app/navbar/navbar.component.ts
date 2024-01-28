import { Component } from '@angular/core';
import { User } from '../signin/signin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  Users: User[] = [];
  loginUser!: User;

  constructor(private router: Router) {
    var loginData = localStorage.getItem('logInUser');
    var localData = localStorage.getItem('Users');
    if (localData && loginData) {
      this.loginUser = JSON.parse(loginData);
      this.Users = JSON.parse(localData);
    }
  }

  ngOnInit(): void {}

  logOut() {
    localStorage.removeItem('logInUser');
    this.router.navigate(['/']);
  }
}
