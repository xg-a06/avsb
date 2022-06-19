import { FC, memo } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import appModel, { Todo } from '@/store/app';
import { useModel } from '@/store/util';

interface PropTypes {
  todo: Todo;
}

const TodoItem: FC<PropTypes> = ({ todo }) => {
  console.log('TodoItem render', todo);

  const { updateTodo, removeTodo } = useModel(appModel);

  const changeHandler = (e: CheckboxChangeEvent) => {
    updateTodo(todo.id, e.target.checked);
  };

  return (
    <div>
      <Checkbox onChange={changeHandler}>
        {todo.name}
        {todo.completed + ''}
      </Checkbox>
      <button onClick={() => removeTodo(todo.id)}>delete</button>
    </div>
  );
};

// const memo = <T extends {todo:any}>(Com: React.FC<T>) => {
//   return(props:T)=>{
//     const propRef=useRef<T|undefined>(undefined);
//     const comRef=useRef<JSX.Element|undefined>(undefined);

//     if(shallowEqual(propRef.current,props)){
//       propRef.current=props;
//       console.log('equal',propRef.current.todo.id);
//       return  comRef.current;
//     }else{
//       propRef.current=props;
//       const tmp=<Com {...propRef.current}  />;
//       comRef.current=tmp;
//       return tmp;
//     }

//   }
// };

export default memo(TodoItem);
