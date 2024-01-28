import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
// import { AuthGuard } from '../auth.guard';
// import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signForm!: FormGroup
 
  constructor(
    private router: Router,
    
  ) {}
  ngOnInit(): void {
    this.createRegistrationForm();
  }
  showLogin: boolean = false;
  SignUpUsers: any[] = [];
  signUpForm!: signUp;
  localData: string | null = '';
  dataParse: string | null = '';

  LogInUsers: any[] = [];
  loginForm!: logIn;

  openlogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }
  signUp(data: signUp) {
    this.SignUpUsers.push(data);
    localStorage.setItem('SignUpUsers', JSON.stringify(this.SignUpUsers));
    this.localData = localStorage.getItem('SignUpUsers');
    if (this.localData !== null) {
      this.SignUpUsers = JSON.parse(this.localData);
      
    }
  }
  

  logIn(data: logIn) {
    this.LogInUsers.push(data);
    localStorage.setItem('logInUsers', JSON.stringify(this.LogInUsers));
    this.dataParse=localStorage.getItem('logInUsers');
    if (this.dataParse !== null) {
      this.LogInUsers = JSON.parse(this.dataParse);
      if(this.LogInUsers){
      this.router.navigate(['/app-add-task'])
    }
  }
  }
  createRegistrationForm(){
    this.signForm = new FormGroup({
      "firstName":new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(10),Validators.pattern("[a-zA-Z]{2,10}")]),
      "email":new FormControl('',Validators.required,[]),
      "password":new FormControl('',Validators.required,[]),

    })
  }
  
 
  save(){
    console.log("form data",this.signForm.value);
  }

  get firstName (){
    return this.signForm.controls['firstName'];

  }
  get email (){
    return this.signForm.controls['email']
  }
  get password (){
    return this.signForm.controls['password']
  }
  
 
}

class signUp {
  name!: string;
  email!: string;
  password!: string;
  get: any;
  controls: any;
}
class logIn {
  email!: string;
  password!: string;
}
