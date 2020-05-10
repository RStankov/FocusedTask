import * as React from 'react';

import { displayName } from './utils';

export default function sortableHandle(Component) {
  function WithSortableHandle(props) {
    return <Component ref={setSortableHandle} {...props} />;
  }

  WithSortableHandle.displayName = displayName('sortableHandle', Component);

  return WithSortableHandle;
}

export function isSortableHandle(el) {
  return el.sortableHandle != null;
}

function setSortableHandle(el) {
  if (el) {
    el.sortableHandle = true;
  }
}
