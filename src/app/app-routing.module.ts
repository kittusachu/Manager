import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { SigninComponent } from './signin/signin.component';
import { TaskListComponent } from './task-list/task-list.component';
const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'task-list', component: TaskListComponent },
  { path: 'app-add-task', component: AddTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule,],
})
export class AppRoutingModule {}
