import { ITodo } from '../../types';

interface TodoListProps {
  todos: ITodo[];
  onComplete: (id: string, checked: boolean) => void;
  onRemove: (id: string) => void;
}

export const TodoList = ({ todos, onComplete, onRemove }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          id={todo.id}
          className="todo-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            columnGap: 4,
          }}
        >
          <input
            id="todo-completed"
            type="checkbox"
            checked={todo.completed}
            onChange={(event) => onComplete(todo.id, event.currentTarget.checked)}
          />
          <p id="todo-text">{todo.text}</p>
          <button id="todo-remove" type="button" onClick={() => onRemove(todo.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
};
