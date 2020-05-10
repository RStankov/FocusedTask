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
} from './utils';

// axis: 'x' | 'y' | 'xy';
// onSort: (result: { oldIndex: number, newIndex: number }) => void;
// transitionDuration: number;
// useDragHandle?: boolean;

export default function sortableContainer(Component) {
  return class WithSortableContainer extends React.Component {
    static displayName = displayName('sortableList', Component);

    static defaultProps = {
      axis: 'y',
      transitionDuration: 300,
    };

    constructor(props) {
      super(props);

      this.manager = new Manager();
    }

    componentWillUnmount() {
      if (this.container) {
        removeEventListener(this.container, 'start', this.onStart);
      }

      if (this.sort) {
        this.onEnd();
      }
    }

    onStart = event => {
      if (this.sorter || shouldCancelStart(event)) {
        return;
      }

      if (
        this.props.useDragHandle &&
        !closest(event.target, isSortableHandle)
      ) {
        return;
      }

      const el = closest(event.target, el => el.sortableInfo != null);

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

    onSort = result => {
      this.sorter = null;

      if (this.props.onSort && result.oldIndex !== result.newIndex) {
        this.props.onSort(result);
      }
    };

    setContainer = ref => {
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
