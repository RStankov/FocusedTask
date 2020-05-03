import React from 'react';
import Stack from 'components/Stack';
import Emoji from 'components/Emoji';
import styles from './styles.module.css';

interface IProps {
  emoji: string;
  title: string;
}

export default function Title({ emoji, title }: IProps) {
  return (
    <Stack.Row gap="xs">
      <Emoji emoji={emoji} size="xxl" />
      <div className={styles.title}>{title}</div>
    </Stack.Row>
  );
}
