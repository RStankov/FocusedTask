import React from 'react';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import { updateTaskTitle, getTitle } from 'modules/task';
import InputText from 'components/InputText';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';
import keyCodes from 'utils/keyCodes';

export default function TaskTitle() {
  const title = useSelector(getTitle);
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
          if (e.keyCode === keyCodes.enter) {
            e.target.blur();
          }
        }}
      />
    </Stack.Row>
  );
}
