import React from 'react';
import InputTextarea from 'components/InputTextarea';
import { updateNote, getNote } from 'modules/task';
import styles from './styles.module.css';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';

export default function TaskNote() {
  const note = useSelector(getNote);
  const dispatch = useDispatch();

  return (
    <InputTextarea
      id="note-text"
      className={styles.textarea}
      value={note}
      onChange={e => dispatch(updateNote(e.target.value))}
    />
  );
}
