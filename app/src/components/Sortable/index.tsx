import * as React from 'react';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from './SortableHOC';
import { ReactComponent as DragIcon } from 'icons/drag.svg';
import styles from './styles.module.css';
import classNames from 'classnames';

export default {
  List: sortableContainer(
    React.forwardRef((props: any, ref: any) => <div ref={ref} {...props} />),
  ),

  Item: sortableElement(
    React.forwardRef(({ as, className, ...props }: any, ref: any) =>
      React.createElement(as || 'div', {
        ref,
        className: classNames(styles.item, className),
        ...props,
      }),
    ),
  ),

  Handle: sortableHandle(
    React.forwardRef(({ className }: any, ref: any) => (
      <DragIcon
        className={classNames(styles.handle, className)}
        ref={ref}
        width={18}
        height={18}
      />
    )),
  ),
};
