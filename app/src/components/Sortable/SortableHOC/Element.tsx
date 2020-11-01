import * as React from 'react';
import { displayName } from './utils';
import ManagerContext from './context';
import { ISortableElement } from './types';

interface IProps {
  index: number;
}

export default function sortableElement<T>(
  build: (props: T, ref: any) => React.ReactElement,
) {
  const Component = (React.forwardRef(build) as any) as React.FC<any>;

  return class WithSortableElement extends React.Component<T & IProps> {
    static displayName = displayName('sortableElement', Component);
    static contextType = ManagerContext;

    ref: { el: ISortableElement } | null = null;

    componentDidUpdate(prevProps: T & IProps) {
      if (this.ref) {
        if (prevProps.index !== this.props.index && this.ref) {
          this.ref.el.sortableInfo.index = this.props.index;
        }
      }
    }

    componentWillUnmount() {
      if (this.ref) {
        this.context.remove(this.ref);
      }
    }

    setRef = (el: any) => {
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
