import { AsyncPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { Component, Signal } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "../store/todo.model";
import { AppState } from "../store/store";
import { Store } from "@ngrx/store";
import * as TodoActions from "../store/actions";
import { todoSelector } from '../store/selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    standalone: true,
    selector: 'app-todo-list',
    imports: [NgFor, NgIf, AsyncPipe, JsonPipe],
    templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
    todos$: Signal<Todo[] | undefined>;
    isLoading$: Signal<boolean | undefined>;
  
    constructor(private store: Store<AppState>) {
      this.todos$ = toSignal(this.store.select(todoSelector)); // observable converted to signal
      this.isLoading$ = toSignal(this.store.select((state) => state.todo.loading));
      this.loadTodos();
    }
  
    loadTodos() {
      this.store.dispatch(TodoActions.loadTodos());
    }
  
    addTodo(index: number) {
      const todo: Todo = { id: index, description: `description ${index}`, completed: false };
      this.store.dispatch(TodoActions.addTodo({ todo }));
    }
  
    complete(todo: Todo) {
      this.store.dispatch(
        TodoActions.updateTodo({ todo: { ...todo, completed: true } })
      );
    }
}

