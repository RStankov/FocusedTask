import * as React from 'react';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';

export default function Section({ title, emoji, actions, children }) {
  return (
    <div className={styles.container}>
      <Stack.Row gap="xs">
        <Emoji emoji={emoji} size="l" />
        <Stack.Expand className={styles.title}>{title}</Stack.Expand>
        {actions && <div>{actions}</div>}
      </Stack.Row>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
