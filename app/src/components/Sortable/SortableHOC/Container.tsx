import * as React from 'react';
import Manager from './Manager';
import { isSortableHandle } from './Handle';
import Sorter from './Sorter';
import ManagerContext from './context';

import {
  closest,
  displayName,
  addEventListener,
  removeEventListener,
  shouldCancelStart,
  IBrowserEvent,
} from './utils';

import { ISortableElement, IAxis, ISortChange } from './types';

interface IProps {
  axis: IAxis;
  onSort:
    | ((change: ISortChange) => void)
    | ((change: ISortChange) => Promise<any>);
  transitionDuration: number;
  useDragHandle?: boolean;
}

export default function sortableContainer<T>(
  build: (props: T, ref: any) => React.ReactElement,
) {
  const Component = (React.forwardRef(build) as any) as React.FC<any>;

  return class WithSortableContainer extends React.Component<T & IProps> {
    static displayName = displayName('sortableList', Component);

    static defaultProps = {
      axis: 'y',
      transitionDuration: 300,
      useDragHandle: false,
    };

    manager = new Manager();
    container: HTMLElement | null = null;
    sorter: Sorter | null = null;

    componentWillUnmount() {
      if (this.container) {
        removeEventListener(this.container, 'start', this.onStart);
      }

      this.sorter?.onEnd();
    }

    onStart = (event: IBrowserEvent) => {
      if (this.sorter || shouldCancelStart(event)) {
        return;
      }

      if (!this.container) {
        return;
      }

      if (
        this.props.useDragHandle &&
        !closest(event.target, isSortableHandle)
      ) {
        return;
      }

      const el = closest(
        event.target,
        (e: any) => e.sortableInfo != null,
      ) as ISortableElement | null;

      if (!el) {
        return;
      }

      this.sorter = new Sorter({
        event,
        el,
        axis: this.props.axis,
        container: this.container,
        manager: this.manager,
        onComplete: this.onSort,
        transitionDuration: this.props.transitionDuration,
      });
    };

    onSort = async (change: ISortChange) => {
      if (this.props.onSort && change.oldIndex !== change.newIndex) {
        await this.props.onSort(change);
      }

      this.sorter = null;
    };

    setContainer = (ref: HTMLElement) => {
      if (this.container) {
        removeEventListener(this.container, 'start', this.onStart);
      }

      this.container = ref;

      if (this.container) {
        addEventListener(this.container, 'start', this.onStart);
      }
    };

    render() {
      const {
        axis: _axis,
        onSort: _onSort,
        transitionDuration: _transitionDuration,
        useDragHandle: _useDragHandle,
        ...props
      } = this.props;

      return (
        <ManagerContext.Provider value={this.manager}>
          <Component ref={this.setContainer} {...props} />
        </ManagerContext.Provider>
      );
    }
  };
}
