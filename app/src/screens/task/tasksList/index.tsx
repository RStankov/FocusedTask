import * as React from 'react';
import { newTask, selectTask } from 'modules/actions';
import Emoji from 'components/Emoji';
import useDispatch from 'hooks/useDispatch';
import useSelector from 'hooks/useSelector';
import { getAllTasks } from 'modules/selectors';

export default function TasksList() {
  const dispatch = useDispatch();
  const tasksList = useSelector(getAllTasks);

  return (
    <div style={{ border: '1px dashed red' }}>
      <h1>
        <Emoji emoji="📋" size="xxl" /> Tasks List
      </h1>
      <ul>
        {tasksList.map(task => (
          <li key={task.id}>
            {task.title}{' '}
            <button onClick={() => dispatch(selectTask(task))}>select</button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(newTask())}>New Task</button>
    </div>
  );
}
