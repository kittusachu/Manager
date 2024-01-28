import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  taskList: any;
  constructor(private route: Router) {
    const localData = localStorage.getItem('task-add');
    if (localData !== null) {
      this.taskList = JSON.parse(localData);
    }
  }
}
