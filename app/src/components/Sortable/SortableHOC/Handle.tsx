import * as React from 'react';
import { displayName } from './utils';

export default function sortableHandle<T>(
  build: (props: T, ref: any) => React.ReactElement,
) {
  const Component = (React.forwardRef(build) as any) as React.FC<T>;

  function WithSortableHandle(props: T) {
    return <Component ref={setSortableHandle} {...props} />;
  }

  WithSortableHandle.displayName = displayName('sortableHandle', Component);

  return WithSortableHandle;
}

type ISortHandle = HTMLElement & {
  sortableHandle?: true;
};

export function isSortableHandle(el: ISortHandle) {
  return el.sortableHandle === true;
}

function setSortableHandle(el: ISortHandle | null) {
  if (el) {
    el.sortableHandle = true;
  }
}
