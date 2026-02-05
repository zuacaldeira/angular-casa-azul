import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-app">
      <header class="header">
        <h1>Casa Azul</h1>
        <p class="subtitle">Todo List</p>
      </header>

      <main class="main">
        <form class="add-todo-form" (ngSubmit)="addTodo()">
          <input
            type="text"
            [(ngModel)]="newTodoTitle"
            name="newTodo"
            placeholder="What needs to be done?"
            class="todo-input"
            autofocus
          />
          <button type="submit" class="add-btn">Add</button>
        </form>

        <ul class="todo-list">
          @for (todo of todoService.allTodos(); track todo.id) {
            <li class="todo-item" [class.completed]="todo.completed">
              <input
                type="checkbox"
                [checked]="todo.completed"
                (change)="todoService.toggleTodo(todo.id)"
                class="todo-checkbox"
              />
              <span class="todo-title">{{ todo.title }}</span>
              <button
                class="delete-btn"
                (click)="todoService.deleteTodo(todo.id)"
                aria-label="Delete todo"
              >
                &times;
              </button>
            </li>
          } @empty {
            <li class="empty-state">No todos yet. Add one above!</li>
          }
        </ul>

        @if (todoService.allTodos().length > 0) {
          <footer class="footer">
            <span class="todo-count">
              {{ todoService.pendingCount() }} item(s) left
            </span>
            @if (todoService.completedCount() > 0) {
              <button class="clear-btn" (click)="todoService.clearCompleted()">
                Clear completed
              </button>
            }
          </footer>
        }
      </main>
    </div>
  `,
  styles: [`
    .todo-app {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
    }

    .header h1 {
      color: #1e88e5;
      font-size: 2.5rem;
      margin: 0;
    }

    .subtitle {
      color: #666;
      margin: 5px 0 0;
    }

    .add-todo-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .todo-input {
      flex: 1;
      padding: 12px 15px;
      font-size: 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
    }

    .todo-input:focus {
      border-color: #1e88e5;
    }

    .add-btn {
      padding: 12px 24px;
      font-size: 1rem;
      background: #1e88e5;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-btn:hover {
      background: #1565c0;
    }

    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 10px;
      transition: background-color 0.2s;
    }

    .todo-item:hover {
      background: #eeeeee;
    }

    .todo-item.completed {
      background: #e8f5e9;
    }

    .todo-item.completed .todo-title {
      text-decoration: line-through;
      color: #888;
    }

    .todo-checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .todo-title {
      flex: 1;
      font-size: 1rem;
    }

    .delete-btn {
      background: none;
      border: none;
      color: #e53935;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
      line-height: 1;
    }

    .delete-btn:hover {
      opacity: 1;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #888;
      font-style: italic;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-top: 1px solid #e0e0e0;
      margin-top: 10px;
    }

    .todo-count {
      color: #666;
    }

    .clear-btn {
      background: none;
      border: none;
      color: #1e88e5;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .clear-btn:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  todoService = inject(TodoService);
  newTodoTitle = '';

  addTodo(): void {
    this.todoService.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
  }
}
