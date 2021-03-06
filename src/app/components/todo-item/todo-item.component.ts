import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})

export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  hideEditing = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}
