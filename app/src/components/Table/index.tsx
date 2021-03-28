import * as React from 'react';
import styles from './styles.module.css';

interface IProps {
  children: React.ReactNode;
}

export default function Table({ children }: IProps) {
  return (
    <table className={styles.table}>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.Row = ({
  children,
  description,
}: {
  description: string | React.ReactNode;
  children: React.ReactNode;
}) => (
  <tr>
    <td>{description}</td>
    <td className={styles.content} align="right">
      {children}
    </td>
  </tr>
);
