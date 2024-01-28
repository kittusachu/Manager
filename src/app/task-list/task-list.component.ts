import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../signin/signin.component';
import { Task } from '../add-task/add-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  taskList: Task[] = [];
  Users: User[] = [];
  loginUser!: User;

  constructor(private route: Router) {
    var loginData = localStorage.getItem('logInUser');
    var localData = localStorage.getItem('Users');

    if (localData && loginData) {
      this.loginUser = JSON.parse(loginData);
      this.Users = JSON.parse(localData);
      var tasks = this.Users.find(
        (x: { email: any }) => x.email == this.loginUser.email
      )?.tasks;
      if (tasks) {
        this.taskList = tasks;
      }
    }
  }

  CompleteTask(task: Task) {
    var index = this.taskList.findIndex((x) => x.id == task.id);
    task.status = 'Completed';
    this.taskList.splice(index, 1, task);
    localStorage.setItem('Users', JSON.stringify(this.Users));
  }
}
