import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../../interfaces/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  @Input() todoModel: Todo;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();


  constructor() {
  }

  ngOnInit(): void {
  }

  onCancelTodoForm() {
    this.cancel.emit(this.todoModel);
  }

  onSaveTodoForm() {
    this.save.emit(this.todoModel);
  }
}
