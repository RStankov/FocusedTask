import React from 'react';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import { updateTaskTitle } from 'modules/task';
import { getTitle } from 'modules/selectors';
import Input from 'components/Input';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';

export default function TaskTitle() {
  const title = useSelector(getTitle);
  const dispatch = useDispatch();

  return (
    <Stack.Row gap="xs">
      <Emoji emoji="🎯" size="xxl" />
      <Input
        className={styles.title}
        value={title}
        onChange={value => dispatch(updateTaskTitle(value))}
        tabIndex={undefined}
      />
    </Stack.Row>
  );
}
