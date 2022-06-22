import { memo, useState, ChangeEvent } from 'react';
import { Input, Button } from 'antd';
import appModel from '@/store/app';
import { useModel } from '@/store/util';

const AddTodo = () => {
  console.log('AddTodo render');
  const [value, setValue] = useState('');

  const { addTodo } = useModel(appModel);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clickHandler = () => {
    addTodo({ name: value, completed: false });
    setValue('');
  };

  return (
    <div>
      <Input
        style={{ width: '200px' }}
        placeholder='todo context'
        value={value}
        onChange={changeHandler}
      />
      <Button type='primary' onClick={clickHandler}>
        Add Todo
      </Button>
    </div>
  );
};

export default memo(AddTodo);
