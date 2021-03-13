import * as React from 'react';
import useDispatch from 'hooks/useDispatch';
import styles from './styles.module.css';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { openTask } from 'modules/selectedScreen';
import useEventListener from 'hooks/useEventListener';
import keyCodes from 'utils/keyCodes';

export default function BackButton() {
  const dispatch = useDispatch();

  useEventListener('keydown', (e) => {
    if(e.keyCode === keyCodes.esc) {
      dispatch(openTask())
    }
  })

  return (
    <CloseIcon className={styles.button} onClick={() => dispatch(openTask())} />
  );
}
