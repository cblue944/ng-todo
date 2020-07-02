import {Injectable} from '@angular/core';
import {Todo} from '../interfaces/todo';
import {Configuration} from '../interfaces/configuration';

@Injectable({
  providedIn: 'root'
})
export class TodosLocalStorageService {
  constructor() {
    if (localStorage.getItem('todos') === null || localStorage.getItem('todos') === undefined) {
      const todos: Todo[] = [];
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  getTodos() {
    const todosAsJson = localStorage.getItem('todos');
    const todos: Todo[] = JSON.parse(todosAsJson);
    return todos;
  }

  createTodo(todo: Todo) {
    const todosAsJson = localStorage.getItem('todos');
    const todos: Todo[] = JSON.parse(todosAsJson);
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  }

  updateTodo(todo: Todo, i: number) {
    const todosAsJson = localStorage.getItem('todos');
    const todos: Todo[] = JSON.parse(todosAsJson);
    if (todos.length > i) {
      todos[i] = todo;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  }

  deleteTodo(i: number) {
    const todosAsJson = localStorage.getItem('todos');
    const todos: Todo[] = JSON.parse(todosAsJson);
    todos.splice(i, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  }

  updateTodos(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }


  saveListId(id: string) {
    localStorage.setItem('listId', id);
  }

  getListId(): string {
    return localStorage.getItem('listId');
  }

  getConfiguration(): Configuration {
    return JSON.parse(localStorage.getItem('configuration')) as Configuration;
  }
  setConfiguration(configuration: Configuration) {
    localStorage.setItem('configuration', JSON.stringify(configuration));
  }
}
