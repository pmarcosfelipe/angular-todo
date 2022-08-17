import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'TODOS';
  
  constructor() {
    this.todos.push(new Todo(1, 'Todo 1', false));
    this.todos.push(new Todo(2, 'Todo 2', false));
    this.todos.push(new Todo(3, 'Todo 3', true));
  }


}
