import * as React from 'react';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from './SortableHOC';
import Stack from 'components/Stack';
import { ReactComponent as DragIcon } from 'icons/drag.svg';
import styles from './styles.module.css';
import classNames from 'classnames';

const Handle = sortableHandle(
  ({ className }: { className?: string }, ref: any) => (
    <div className={classNames(styles.handle, className)} ref={ref}>
      <DragIcon width={18} height={18} />
    </div>
  ),
);

export default {
  List: sortableContainer((props: { children: React.ReactNode }, ref: any) => (
    <div ref={ref} {...props} />
  )),

  Item: sortableElement(
    (
      {
        className,
        children,
        ...props
      }: {
        children: React.ReactNode;
        className?: string;
        align?: 'start';
        gap?: 'm';
        style?: any;
        onClick?: (e: any) => void;
      },
      ref: any,
    ) => (
      <Stack.Row
        ref={ref}
        className={classNames(styles.item, className)}
        {...props}>
        {children}
        <Handle />
      </Stack.Row>
    ),
  ),
};

