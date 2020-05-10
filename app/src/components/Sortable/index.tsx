import * as React from 'react';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from './SortableHOC';
import { ReactComponent as DragIcon } from 'icons/drag.svg';
import styles from './styles.module.css';

export default {
  List: sortableContainer(
    React.forwardRef((props: any, ref: any) => <div ref={ref} {...props} />),
  ),

  Item: sortableElement(
    React.forwardRef(({ as, ...props }: any, ref: any) =>
      React.createElement(as || 'div', { ref, ...props }),
    ),
  ),

  Handle: sortableHandle(
    React.forwardRef((_props: any, ref: any) => (
      <DragIcon className={styles.handle} ref={ref} width={18} height={18} />
    )),
  ),
};
