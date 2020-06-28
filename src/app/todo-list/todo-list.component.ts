import {Component, OnInit} from '@angular/core';
import {MY_TODOS} from '../mock/todo-mock';
import {Todo} from '../interfaces/todo';
import {CdkDragSortEvent} from '@angular/cdk/drag-drop/drag-events';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Configuration} from '../interfaces/configuration';
import {TodosFirebaseService} from '../services/todos-firebase.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  myTodos = MY_TODOS;
  showCurrentTodoForm = false;
  currentTodoModel: Todo = {id: '5', title: '', description: '', isDone: false};
  currentIndex = 3;
  configuration: Configuration = {hideCompleted: false, storeLocaly: true};

  constructor(private todoFirebaseService: TodosFirebaseService) {
  }

  onToggleDone(todo: Todo): void {
    todo.isDone = !todo.isDone;
  }

  ngOnInit(): void {
    this.todoFirebaseService.getTodos().subscribe(data => {
      this.myTodos = data.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.get('title'),
          description: e.payload.doc.get('description'),
          isDone: e.payload.doc.get('isDone')
        } as Todo;
      });
    });
  }

  initFirebase() {
  }

  onCancelTodoForm() {
    this.showCurrentTodoForm = false;
  }

  onSaveTodo() {
    const exisitingTodo: Todo = this.myTodos.find(t => t.id === this.currentTodoModel.id);
    if (exisitingTodo !== undefined) {
      exisitingTodo.title = this.currentTodoModel.title;
      exisitingTodo.description = this.currentTodoModel.description;
    } else {
      if (this.configuration.storeLocaly) {
        this.todoFirebaseService.createTodo({
          id: this.currentTodoModel.id,
          title: this.currentTodoModel.title,
          description: this.currentTodoModel.description,
          isDone: false
        });
      } else {
        this.myTodos.push({
          id: this.currentTodoModel.id,
          title: this.currentTodoModel.title,
          description: this.currentTodoModel.description,
          isDone: false
        });
      }
    }
  }

  onDeleteTodo(todo: Todo) {
    this.myTodos = this.myTodos.filter(t => t.id !== todo.id);
  }

  onEditTodo(todo: Todo) {
    this.currentTodoModel.id = todo.id;
    this.currentTodoModel.description = todo.description;
    this.currentTodoModel.title = todo.title;
    this.showCurrentTodoForm = true;
  }

  onAddTodo() {
    this.currentTodoModel.description = '';
    this.currentTodoModel.title = '';
    this.showCurrentTodoForm = true;
  }

  onDrop(event: CdkDragSortEvent<Todo[]>) {
    moveItemInArray(this.myTodos, event.previousIndex, event.currentIndex);
  }
}
