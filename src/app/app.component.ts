import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashCan, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: String = 'MY TASKS';
  public form: FormGroup;

  faTrashCan = faTrashCan;
  faCircleCheck = faCircleCheck;
  faRotateBack = faRotateBack;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();

    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;

    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;

    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) this.todos = JSON.parse(data);
  }

  changeMode(mode: string) {
    this.mode = mode;

    if (this.mode === 'list') {
      this.clear();
    }
  }
}
