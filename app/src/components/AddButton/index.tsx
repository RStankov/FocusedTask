import * as React from 'react';
import styles from './styles.module.css';

interface IProps {
  onClick: () => void;
  subject: string;
}

export default function AddButton({ onClick, subject }: IProps) {
  return (
    <div className={styles.button} onClick={onClick}>
      Click to add {subject}
    </div>
  );
}
