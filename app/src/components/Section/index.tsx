import * as React from 'react';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';

interface IProps {
  title: string;
  emoji: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({ title, emoji, actions, children }: IProps) {
  return (
    <div>
      <Stack.Row gap="s" className={styles.header}>
        <Emoji emoji={emoji} size="l" />
        <Stack.Expand className={styles.title}>{title}</Stack.Expand>
        {actions && <div>{actions}</div>}
      </Stack.Row>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
