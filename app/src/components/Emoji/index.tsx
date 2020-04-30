import * as React from 'react';
import styles from './styles.module.css';

interface IProps {
  emoji: string;
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export default function Emoji({ emoji, size = 'm', ...props }: IProps) {
  return (
    <span role="img" className={styles[`size-${size}`]} {...props}>
      {emoji}
    </span>
  );
}
