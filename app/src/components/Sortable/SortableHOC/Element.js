import * as React from 'react';
import { displayName } from './utils';
import ManagerContext from './context';

// index: number

export default function sortableElement(Component) {
  return class WithSortableElement extends React.Component {
    static displayName = displayName('sortableElement', Component);

    static contextType = ManagerContext;

    componentDidUpdate(prevProps) {
      if (this.ref) {
        if (prevProps.index !== this.props.index) {
          this.ref.el.sortableInfo.index = this.props.index;
        }
      }
    }

    componentWillUnmount() {
      if (this.ref) {
        this.context.remove(this.ref);
      }
    }

    setRef = el => {
      if (this.ref) {
        this.context.remove(this.ref);
      }

      if (!el) {
        return;
      }

      el.sortableInfo = {
        index: this.props.index,
      };

      this.ref = { el };

      this.context.add(this.ref);
    };

    render() {
      const { index: _index, ...props } = this.props;

      return <Component ref={this.setRef} {...props} />;
    }
  };
}
