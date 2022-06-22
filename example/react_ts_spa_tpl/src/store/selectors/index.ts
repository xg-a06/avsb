import { useMemo } from 'react';
import appModel from '@/store/app';
import { useModel } from '@/store/util';

export const useTodos = () => {
  const { todos, filter } = useModel(appModel);

  const ret = useMemo(() => {
    switch (filter) {
      case 'all':
        return todos;
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        throw Error('Error: un supported filter');
    }
  }, [todos, filter]);

  return ret;
};
