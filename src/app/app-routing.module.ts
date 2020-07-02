import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {AboutPageComponent} from './components/about-page/about-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
  { path: 'about', component: AboutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
