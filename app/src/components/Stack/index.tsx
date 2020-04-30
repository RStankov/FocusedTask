import * as React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

interface IProps {
  children: React.ReactNode;
  className?: string;
  direction: 'column' | 'row';
  align: 'start' | 'center' | 'end';
  justify: 'start' | 'center' | 'end';
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xl';
}

function Stack({
  children,
  className,
  direction,
  align,
  justify,
  gap,
}: IProps) {
  const combinedClassName = classNames(
    className,
    styles.stack,
    styles[`align-${align}`],
    styles[`direction-${direction}`],
    styles[`justify-${justify}`],
    gap && styles[`gap-${direction}-${gap}`],
  );

  return <div className={combinedClassName}>{children}</div>;
}

type ISubProps = {
  children: React.ReactNode,
  className?: string,
  align?: 'start' | 'center' | 'end',
  justify?: 'start' | 'center' | 'end',
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xl',
};

export default {
  Column: (props: ISubProps) => (
    <Stack direction="column" align="start" justify="center" {...props} />
  ),
  Row: (props: ISubProps) => (
    <Stack direction="row" align="center" justify="start" {...props} />
  ),
  Expand: ({
    className,
    ...props
  }: {
    className?: string,
    children: React.ReactNode,
  }) => <div className={classNames(styles.expand, className)} {...props} />,
};
