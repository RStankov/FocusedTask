import React from 'react';
import styles from './styles.module.css';

interface IProps {
  isChecked: boolean;
  onClick: () => void;
}

export default function TodoCheckbox({ isChecked, onClick }: IProps) {
  function handleClick(e: React.SyntheticEvent<any>) {
    e.stopPropagation();
    onClick();
  }

  if (isChecked) {
    return (
      <span
        role="img"
        aria-label="completed"
        className={styles.checked}
        onClick={handleClick}>
        ✅
      </span>
    );
  }

  return <div className={styles.unchecked} onClick={handleClick} />;
}
