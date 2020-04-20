import * as React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

export default function InputText({ className, ...props}) {
  return <input className={classNames(className, styles.input)} {...props} />
}
