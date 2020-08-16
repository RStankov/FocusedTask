import * as React from 'react';
import styles from './styles.module.css';
import { autoUpdateSubscribe } from 'utils/electron';

export default function AutoUpdateStatus() {
  const status = useAutoUpdateStatus();

  if (!status) {
    return null;
  }

  return <span className={styles.autoupdate}>{status}</span>;
}

function useAutoUpdateStatus() {
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    return autoUpdateSubscribe(m => {
      setStatus(m);
    });
  }, [setStatus]);

  return status;
}
