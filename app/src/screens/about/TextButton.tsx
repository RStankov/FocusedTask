import * as React from 'react';
import styles from './styles.module.css';

interface IProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function TextButton({ onClick, children }: IProps) {
  return (
    <span
      className={styles.button}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      {children}
    </span>
  );
}
