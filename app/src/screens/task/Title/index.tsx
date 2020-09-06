import React from 'react';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import { updateTaskTitle } from 'modules/task';
import { getTitle, getSelectedTaskId } from 'modules/selectors';
import Input from 'components/Input';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';

export default function TaskTitle() {
  const title = useSelector(getTitle);
  const id = useSelector(getSelectedTaskId);
  const dispatch = useDispatch();

  return (
    <Stack.Row>
      <Input
        key={id}
        className={styles.title}
        value={title}
        onChange={value => dispatch(updateTaskTitle(value || 'Untitled'))}
        tabIndex={undefined}
        placeholder="Title..."
      />
    </Stack.Row>
  );
}
