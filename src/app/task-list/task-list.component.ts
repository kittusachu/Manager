import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  taskList: any;
  Users: any;
  loginUser: any;
  constructor(private route: Router) {
    // const localData = localStorage.getItem('task-add');
    // if (localData !== null) {
    //   this.taskList = JSON.parse(localData);
    // }
    var loginData = localStorage.getItem('logInUser');
    var localData = localStorage.getItem('Users');
    if (localData && loginData) {
      this.loginUser = JSON.parse(loginData);
      this.Users = JSON.parse(localData);
      var tasks = this.Users.find(
        (x: { email: any; }) => x.email == this.loginUser.email
      )?.tasks;
      if (tasks) {
        this.taskList = tasks;
      }
    }
  }
}
