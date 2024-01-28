import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Task } from '../add-task/add-task.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  // signForm!: FormGroup;
  showLogin: boolean = true;
  Users: User[] = [];
  signUpForm!: User;
  dataParse: string | null = '';
  LogInUsers: any[] = [];
  // loginForm!: FormGroup;
  loginUser!: User;

  constructor(private router: Router) {
    var loginData = localStorage.getItem('logInUser');
    if (loginData) {
      this.router.navigate(['/app-add-task']);
    }
    var localData = localStorage.getItem('Users');
    if (localData) {
      this.Users = JSON.parse(localData);
    }
  }

  ngOnInit(): void {
    // this.createRegistrationForm();
  }

  openlogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  signUp(data: User) {
    var userData: User = {
      email: data.email,
      name: data.name,
      password: data.password,
      tasks: [],
    };
    this.Users.push(userData);
    localStorage.setItem('Users', JSON.stringify(this.Users));
    this.resetSignupForm();
    this.openlogin();
  }

  logIn(data: logIn) {
    var loginUserData = this.Users.find(
      (x) => x.email == data.email && x.password == data.password
    );

    if (loginUserData) {
      this.loginUser = loginUserData;
      localStorage.setItem('logInUser', JSON.stringify(this.loginUser));
      this.router.navigate(['/app-add-task']);
    } else {
      alert('Please enter valid email and Password');
    }
    this.resetloginForm();
  }

  resetloginForm() {
    // this.loginForm.reset();
  }

  resetSignupForm() {
    // this.signForm.reset();
  }
  // createRegistrationForm() {
  //   this.signForm = new FormGroup({
  //     name: new FormControl('', [Validators.required]),
  //     email: new FormControl('', Validators.required, []),
  //     password: new FormControl('', Validators.required, []),
  //   });
  // }

  // get name() {
  //   return this.signForm.controls['name'];
  // }
  // get email() {
  //   return this.signForm.controls['email'];
  // }
  // get password() {
  //   return this.signForm.controls['password'];
  // }
}

export class User {
  name!: string;
  email!: string;
  password!: string;
  tasks!: Task[];
}

class logIn {
  email!: string;
  password!: string;
}
