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
  React.forwardRef(({ className }: any, ref: any) => (
    <div className={classNames(styles.handle, className)}>
      <DragIcon ref={ref} width={18} height={18} />
    </div>
  )),
);

export default {
  List: sortableContainer(
    React.forwardRef((props: any, ref: any) => <div ref={ref} {...props} />),
  ),

  Item: sortableElement(
    React.forwardRef(({ className, children, ...props }: any, ref: any) => (
      <Stack.Row
        ref={ref}
        className={classNames(styles.item, className)}
        {...props}>
        {children}
        <Handle />
      </Stack.Row>
    )),
  ),
};
