import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo';
import {CdkDragSortEvent} from '@angular/cdk/drag-drop/drag-events';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Configuration} from '../../interfaces/configuration';
import {TodosFirebaseService} from '../../services/todos-firebase.service';
import {TodosLocalStorageService} from '../../services/todos-localstorage.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  myTodos: Todo[];
  showCurrentTodoForm = false;
  currentTodoModel: Todo = {id: '', title: '', description: '', isDone: false};
  currentTodoIndex: number;
  configuration: Configuration;
  private todoSubscription: Subscription;

  constructor(private todoFirebaseService: TodosFirebaseService,
              private todosLocalStorageService: TodosLocalStorageService,
              private route: ActivatedRoute) {
  }

  onToggleDone(todo: Todo): void {
    todo.isDone = !todo.isDone;
    this.todosLocalStorageService.updateTodo(todo, this.getTodoIndex(todo));
    if (this.configuration.storeInCloud) {
      this.todoFirebaseService.updateTodo(todo);
    }
  }

  ngOnInit(): void {
    this.configuration = this.todosLocalStorageService.getConfiguration();
    if (!this.configuration) {
      this.configuration = {
        hideCompleted: false,
        storeInCloud: false,
        allowDelete: false,
        listId: this.todosLocalStorageService.getListId()
      };
    }
    this.route.fragment.subscribe((fragment: string) => {
      console.log(fragment);
      if (fragment) {
        this.todosLocalStorageService.saveListId(fragment);
        this.configuration.storeInCloud = true;
        this.configuration.listId = fragment;
        this.todosLocalStorageService.setConfiguration(this.configuration);
      }
    });

    const listId = this.todosLocalStorageService.getListId();
    if (listId) {
      this.todoFirebaseService.setListId(listId);
    } else {
      this.todoFirebaseService.createNewList().then(id => {
        this.todosLocalStorageService.saveListId(id);
        this.todoFirebaseService.setListId(id);
        this.configuration.listId = id;
      });
    }

    if (this.configuration.storeInCloud) {
      this.initFirebase();
    } else {
      this.myTodos = this.todosLocalStorageService.getTodos();
    }
  }

  onConfigurationChange($event) {
    if (this.configuration.storeInCloud && $event === 'storeInCloud') {
      this.initFirebase();
    } else {
      if (this.todoSubscription) {
        this.todoSubscription.unsubscribe();
      }
    }
  }

  initFirebase() {
    if (this.configuration.storeInCloud) {
      if (this.myTodos) {
        this.myTodos.forEach(t => {
          this.todoFirebaseService.createTodoIfNew(t);
        });
      }

      this.todoSubscription = this.todoFirebaseService.getTodos().subscribe(data => {
        this.myTodos = data.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.get('title'),
            description: e.payload.doc.get('description'),
            isDone: e.payload.doc.get('isDone')
          } as Todo;
        });
        this.todosLocalStorageService.updateTodos(this.myTodos);
      });
    }
  }

  onCancelTodoForm() {
    this.showCurrentTodoForm = false;
  }

  onSaveTodo(todo: Todo) {
    if (this.configuration.storeInCloud) {
      if (this.currentTodoModel.id !== null) {
        this.todoFirebaseService.updateTodo(this.currentTodoModel);
      } else {
        this.todoFirebaseService.createTodo({
          id: this.currentTodoModel.id,
          title: this.currentTodoModel.title,
          description: this.currentTodoModel.description,
          isDone: this.currentTodoModel.isDone
        });
      }
    } else {
      if (this.currentTodoIndex !== undefined) {
        console.log(this.currentTodoIndex);
        this.myTodos = this.todosLocalStorageService.updateTodo(this.currentTodoModel, this.currentTodoIndex);
      } else {
        this.myTodos = this.todosLocalStorageService.createTodo({
          id: this.currentTodoModel.id,
          title: this.currentTodoModel.title,
          description: this.currentTodoModel.description,
          isDone: false
        });
      }
    }
    this.showCurrentTodoForm = false;
  }

  onDeleteTodo(todo: Todo) {
    if (this.configuration.storeInCloud) {
      this.todoFirebaseService.deleteTodo(todo.id);
    } else {
      this.myTodos = this.todosLocalStorageService.deleteTodo(this.myTodos.indexOf(todo));
    }
  }

  onEditTodo(todo: Todo) {
    this.currentTodoIndex = this.getTodoIndex(todo);
    this.currentTodoModel = {id: todo.id, description: todo.description, title: todo.title, isDone: todo.isDone};
    this.showCurrentTodoForm = true;
  }

  onAddTodo() {
    this.currentTodoIndex = undefined;
    this.currentTodoModel = {id: null, title: '', description: '', isDone: false};
    this.showCurrentTodoForm = true;
  }

  onDrop(event: CdkDragSortEvent<Todo[]>) {
    moveItemInArray(this.myTodos, event.previousIndex, event.currentIndex);
    this.todosLocalStorageService.updateTodos(this.myTodos);
  }

  private getTodoIndex(todo: Todo): number {
    return this.myTodos.findIndex(t => t === todo);
  }
}
