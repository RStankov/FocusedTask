import * as React from 'react';
import useDispatch from 'hooks/useDispatch';
import styles from './styles.module.css';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { openTask } from 'modules/selectedScreen';

export default function BackButton() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if(event.key === 'Escape') {
        dispatch(openTask())
      }
    }

    window.addEventListener("keydown", handleEscPress);
    return () => {
      window.removeEventListener("keydown", handleEscPress);
    }
  }, [dispatch])

  return (
    <CloseIcon className={styles.button} onClick={() => dispatch(openTask())} />
  );
}
