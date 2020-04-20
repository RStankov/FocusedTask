import * as React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

function Stack({
  children,
  className,
  direction,
  align,
  justify,
  gap,
  ...props
}) {
  const combinedClassName = classNames(
    className,
    styles.stack,
    styles[`align-${align}`],
    styles[`direction-${direction}`],
    styles[`justify-${justify}`],
    gap && styles[`gap-${direction}-${gap}`],
  );

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

export default {
  Column: props => (
    <Stack direction="column" align="start" justify="center" {...props} />
  ),
  Row: props => (
    <Stack direction="row" align="center" justify="start" {...props} />
  ),
  Expand: ({ className, ...props }) => (
    <div className={classNames(styles.expand, className)} {...props} />
  ),
};
