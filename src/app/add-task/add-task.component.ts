import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit{
  taskAddObj: TaskAdd;
  localTaskData: string | null = '';
  taskList: TaskAdd[] = [];

  constructor() {
    this.taskAddObj = new TaskAdd();
    this.localTaskData = localStorage.getItem('task-add');
    if (this.localTaskData !== null) {
      this.taskList = JSON.parse(this.localTaskData);
    }
  }
  ngOnInit(): void {
    
}

  createnewtask() {
    const task = JSON.stringify(this.taskAddObj);
    const parseTask: TaskAdd = JSON.parse(task);
    parseTask.id = this.taskList.length + 1;
    this.taskList.push(parseTask);
    localStorage.setItem('task-add', JSON.stringify(this.taskList));
    window.location.reload();
  }
}

class TaskAdd {
  id!: number;
  taskName!: string;
  description!: string;
  dueDate!: Date;
  status!: string;
}
