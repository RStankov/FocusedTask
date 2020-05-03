import React from 'react';
import useDispatch from 'hooks/useDispatch';
import styles from './styles.module.css';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { openTask } from 'modules/selectedScreen';

export default function BackButton() {
  const dispatch = useDispatch();

  return (
    <CloseIcon className={styles.close} onClick={() => dispatch(openTask())} />
  );
}
