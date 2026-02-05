import { Injectable, signal, computed } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<TodoItem[]>([]);
  private nextId = 1;

  readonly allTodos = this.todos.asReadonly();
  readonly completedCount = computed(() => this.todos().filter(t => t.completed).length);
  readonly pendingCount = computed(() => this.todos().filter(t => !t.completed).length);

  addTodo(title: string): void {
    if (!title.trim()) return;

    const newTodo: TodoItem = {
      id: this.nextId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };

    this.todos.update(todos => [...todos, newTodo]);
  }

  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  clearCompleted(): void {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
  }
}
