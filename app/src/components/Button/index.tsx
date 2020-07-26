import * as React from 'react';
import styles from './styles.module.css';

interface IProps {
  onClick: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Button(props: IProps) {
  return <button className={styles.button} {...props} />;
}
