import * as React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

interface ISubProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  gap?: 's' | 'm' | 'l' | 'xl';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface IProps extends ISubProps {
  direction: 'column' | 'row';
}

const Stack = React.forwardRef(
  (
    { className, direction, align, justify, gap, ...props }: IProps,
    ref: any,
  ) => {
    const combinedClassName = classNames(
      className,
      styles.stack,
      styles[`align-${align}`],
      styles[`direction-${direction}`],
      styles[`justify-${justify}`],
      gap && styles[`gap-${direction}-${gap}`],
    );

    return <div ref={ref} className={combinedClassName} {...props} />;
  },
);

export default {
  Column: React.forwardRef((props: ISubProps, ref) => (
    <Stack
      direction="column"
      align="start"
      justify="center"
      ref={ref}
      {...props}
    />
  )),
  Row: React.forwardRef((props: ISubProps, ref) => (
    <Stack
      direction="row"
      align="center"
      justify="start"
      ref={ref}
      {...props}
    />
  )),
  Expand: ({
    className,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    onClick?: any;
  }) => <div className={classNames(styles.expand, className)} {...props} />,
};
