import { memo, useState } from 'react';
import TodoItem from '@/components/todoItem';
import { useTodos } from '@/store/selectors';

const TodoList = () => {
  const [state, setState] = useState(1);

  const todos = useTodos();
  console.log('TodoList render');

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <div>
        <span>{state}</span>
        <button onClick={() => setState((c) => c + 1)}>add</button>
      </div>
    </div>
  );
};

export default memo(TodoList);
