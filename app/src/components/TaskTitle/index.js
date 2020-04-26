import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import { updateTaskTitle } from 'modules/task';
import InputText from 'components/InputText';

export default function TaskTitle() {
  const title = useSelector(store => store.task.title);
  const dispatch = useDispatch();

  return (
    <Stack.Row gap="xs">
      <Emoji emoji="🎯" size="xxl" />
      <InputText
        type="text"
        className={styles.title}
        value={title}
        onChange={e => dispatch(updateTaskTitle(e.target.value))}
        onKeyDown={e => {
          if (e.keyCode === 27 || e.keyCode === 13) {
            e.target.blur();
          }
        }}
      />
    </Stack.Row>
  );
}
