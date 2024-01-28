import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../signin/signin.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  taskAddObj: Task;
  localTaskData: string | null = '';
  Users: User[] = [];
  loginUser!: User;
  taskList: Task[] = [];

  constructor(private router: Router) {
    this.taskAddObj = new Task();
    var loginData = localStorage.getItem('logInUser');
    if (loginData == null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    var loginData = localStorage.getItem('logInUser');
    var localData = localStorage.getItem('Users');
    if (localData && loginData) {
      this.loginUser = JSON.parse(loginData);
      this.Users = JSON.parse(localData);
      var tasks = this.Users.find(
        (x) => x.email == this.loginUser.email
      )?.tasks;
      if (tasks) {
        this.taskList = tasks;
      }
    }
  }

  addTask() {
    const parseTask: Task = this.taskAddObj;
    parseTask.id = Guid.create().toString();
    // this.taskList.push(parseTask);
    this.Users.find((x) => x.email == this.loginUser.email)?.tasks.push(
      parseTask
    );
    localStorage.setItem('Users', JSON.stringify(this.Users));
    window.location.reload();
  }
}

export class Task {
  id!: string;  
  taskName!: string;
  description!: string;
  dueDate!: Date;
  status!: string;
}
