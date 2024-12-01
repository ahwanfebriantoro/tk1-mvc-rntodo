import Todo from '../models/Todo';

class TodoController {
  todos: Todo[] = [
    {
      completed: true,
      id: '12131a3',
      title: 'Sample 1',
    },
    {
      completed: true,
      id: '12131ad3',
      title: 'Sample 2',
    },
    {
      completed: true,
      id: '121313',
      title: 'Sample 3',
    },
  ];

  addTodo(title: string) {
    const id = new Date().getTime().toString();
    const newTodo = new Todo(id, title);
    this.todos.push(newTodo);
    return this.todos;
  }

  toggleTodo(id: string) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    );
    return this.todos;
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this.todos;
  }

  getTodos() {
    return this.todos;
  }
}

export default new TodoController();
