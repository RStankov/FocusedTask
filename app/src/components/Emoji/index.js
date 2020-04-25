import * as React from 'react';
import styles from './styles.module.css';

export default function Emoji({ emoji, size = 'm', ...props }) {
  return (
    <span role="img" className={styles[`size-${size}`]} {...props}>
      {emoji}
    </span>
  );
}
