/**
 * 3. Build a To-Do List
 *
 * Problem:
 * - Create a to-do list component where users can add, remove, and mark items as complete.
 * - 사용자가 항목을 추가, 제거, 완료로 표시할 수 있는 할 일 목록 구성 요소를 만듭니다.
 */

import { useState } from 'react';

import { ITodo } from '../../types';

const uuid = () => crypto.randomUUID();

export const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: uuid(),
      text: 'Build a To Do List',
      completed: false,
    },
  ]);
  const [text, setText] = useState<string>('');

  const addTodo = (_text: string) => {
    const text = _text.trim();

    if (!text.length) return;

    // 투두를 추가
    setTodos((prev) => [...prev, { id: uuid(), text, completed: false }]);

    // 인풋 초기화
    setText('');
  };

  const removeTodo = (id: string) => {
    // 선택한 투두 삭제
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id: string, checked: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => ({
        ...todo,
        // 선택한 투두의 완료 상태 변경
        completed: todo.id === id ? checked : todo.completed,
      })),
    );
  };

  return (
    <div>
      <div>
        <input
          id="text-input"
          type="text"
          placeholder="Todo Name"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          onKeyDown={(event) => event.key === 'Enter' && addTodo(text)}
        />
        <button id="add-button" type="button" onClick={() => addTodo(text)}>
          +
        </button>
      </div>

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
              onChange={(event) => completeTodo(todo.id, event.currentTarget.checked)}
            />
            <p id="todo-text">{todo.text}</p>
            <button id="todo-remove" type="button" onClick={() => removeTodo(todo.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
