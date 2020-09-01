import React from 'react';
import styles from './styles.module.css';

interface IProps {
  title: string;
}

export default function Title({ title }: IProps) {
  return <div className={styles.title}>{title}</div>;
}
