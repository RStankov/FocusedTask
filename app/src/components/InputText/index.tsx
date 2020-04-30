import * as React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { Omit } from 'utility-types';

interface IKeyDownEvent {
  target: HTMLInputElement;
  metaKey: boolean;
  keyCode: number;
}

interface IProps
  extends // NOTE(rstankov): have to overwrite IKeyDownEvent because target wasn't recognised
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onKeyDown'> {
  onKeyDown: (e: IKeyDownEvent) => void;
}

export default function InputText({ className, onKeyDown, ...props }: IProps) {
  return (
    <input
      className={classNames(className, styles.input)}
      onKeyDown={onKeyDown as any}
      {...props}
    />
  );
}
