import * as React from 'react';
import { newTask, selectTask } from 'modules/actions';
import useDispatch from 'hooks/useDispatch';
import useSelector from 'hooks/useSelector';
import { getAllTasks } from 'modules/selectors';
import BackButton from 'components/BackButton';
import Title from 'components/Title';
import { openTask } from 'modules/selectedScreen';
import styles from './styles.module.css';

export default function TasksList() {
  const dispatch = useDispatch();
  const tasksList = useSelector(getAllTasks);

  return (
    <>
      <BackButton />
      <Title emoji="📋" title="Tasks List" />
      <ul>
        {tasksList.map(task => (
          <li key={task.id}>
            <span
              className={styles.link}
              onClick={() => {
                dispatch(selectTask(task));
                dispatch(openTask());
              }}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          dispatch(newTask());
          dispatch(openTask());
        }}>
        New Task
      </button>
    </>
  );
}
