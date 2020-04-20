import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from 'components/Textarea';
import { updateNote } from 'modules/task';
import styles from './styles.module.css';

export default function TaskNote() {
  const note = useSelector(store => store.task.note);
  const dispatch = useDispatch();

  return (
    <Textarea
      className={styles.textarea}
      value={note}
      onChange={e => dispatch(updateNote(e.target.value))}
    />
  );
}
