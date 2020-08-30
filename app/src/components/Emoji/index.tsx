import * as React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

interface IProps {
  emoji: string;
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export default function Emoji({
  emoji,
  className,
  size = 'm',
  ...props
}: IProps) {
  return (
    <span
      role="img"
      className={classNames(className, styles.emoji, styles[`size-${size}`])}
      {...props}>
      {emoji}
    </span>
  );
}
