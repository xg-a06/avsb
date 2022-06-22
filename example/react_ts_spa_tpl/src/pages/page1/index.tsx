import { useState } from 'react';
import FilterRow from '@/components/filterRow';
import AddTodo from '@/components/addTodo';
import TodoList from '@/components/todoList';
import { useLogout } from '@/services/userService';
import style from './index.less';

const Index = () => {
  const [count, setCount] = useState(0);
  const { refetch } = useLogout();
  return (
    <div className={style.test}>
      <FilterRow />
      <AddTodo />
      <TodoList />
      <div>
        {count}
        <button onClick={() => setCount((c) => c + 1)}>add</button>
      </div>
      <div>
        <button onClick={() => refetch()}>logout</button>
      </div>
    </div>
  );
};

export default Index;
