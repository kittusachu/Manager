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
  showLogin: boolean = true;
  Users: User[] = [];
  loginUser!: User;
  loginFormData: logIn;
  signFormData: User;

  signForm!: FormGroup;
  loginValidationForm!: FormGroup;

  constructor(private router: Router) {
    this.loginFormData = new logIn();
    this.signFormData = new User();
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
    this.createRegistrationForm();
    this.createLoginForm();
  }

  openlogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  signUp() {
    var newUser = this.Users.find((x) => x.email == this.signFormData.email);

    if (newUser != null) {
      alert('User already exist');
      this.resetSignupForm();
    } else {
      this.signFormData.tasks = [];
      this.Users.push(this.signFormData);
      localStorage.setItem('Users', JSON.stringify(this.Users));
      alert('User register');
      this.openlogin();
    }
  }

  logIn() {
    var loginUserData = this.Users.find(
      (x) =>
        x.email == this.loginFormData.email &&
        x.password == this.loginFormData.password
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

  createRegistrationForm() {
    this.signForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required, []),
    });
  }
  get name() {
    return this.signForm.controls['name'];
  }
  get email() {
    return this.signForm.controls['email'];
  }
  get password() {
    return this.signForm.controls['password'];
  }

  createLoginForm() {
    this.loginValidationForm = new FormGroup({
      loginEmail: new FormControl('', Validators.required, []),
      loginPassword: new FormControl('', Validators.required, []),
    });
  }
  get loginEmail() {
    return this.loginValidationForm.controls['loginEmail'];
  }
  get loginPassword() {
    return this.loginValidationForm.controls['loginPassword'];
  }

  resetloginForm() {
    this.loginFormData.email = '';
    this.loginFormData.password = '';
  }

  resetSignupForm() {
    this.signFormData.email = '';
    this.signFormData.name = '';
    this.signFormData.password = '';
    this.signFormData.tasks = [];
  }
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
