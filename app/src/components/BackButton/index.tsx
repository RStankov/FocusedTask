import useDispatch from 'hooks/useDispatch';
import styles from './styles.module.css';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { openTask } from 'modules/selectedScreen';

export default function BackButton() {
  const dispatch = useDispatch();

  return (
    <CloseIcon className={styles.button} onClick={() => dispatch(openTask())} />
  );
}
