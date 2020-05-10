const EVENTS = {
  start: ['touchstart', 'mousedown'],
  move: ['touchmove', 'mousemove'],
  end: ['touchend', 'touchcancel', 'mouseup'],
};

export function addEventListener(el, event, listener) {
  EVENTS[event].forEach(eventName =>
    el.addEventListener(eventName, listener, false),
  );
}

export function removeEventListener(el, event, listener) {
  EVENTS[event].forEach(eventName =>
    el.removeEventListener(eventName, listener),
  );
}

const vendorPrefix = (function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    // Server environment
    return '';
  }

  // fix for: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  // window.getComputedStyle() returns null inside an iframe with display: none
  // in this case return an array with a fake mozilla style in it.
  const styles = window.getComputedStyle(document.documentElement, '') || [
    '-moz-hidden-iframe',
  ];
  const pre = (Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) ||
    (styles.OLink === '' && ['', 'o']))[1];

  switch (pre) {
    case 'ms':
      return 'ms';
    default:
      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
  }
})();

export function setStyle(el, styles) {
  Object.keys(styles).forEach(key => {
    el.style[key] = styles[key];
  });
}

export function setTranslate3d(el, translate) {
  el.style[`${vendorPrefix}Transform`] =
    translate == null ? '' : `translate3d(${translate.x}px,${translate.y}px,0)`;
}

export function setTransitionDuration(el, duration) {
  el.style[`${vendorPrefix}TransitionDuration`] =
    duration == null ? '' : `${duration}ms`;
}

export function closest(el, fn) {
  while (el) {
    if (fn(el)) {
      return el;
    }

    el = el.parentNode;
  }

  return null;
}

function getPixelValue(stringValue) {
  if (stringValue.substr(-2) === 'px') {
    return parseFloat(stringValue);
  }

  return 0;
}

export function getElementMargin(element) {
  const style = window.getComputedStyle(element);

  return {
    bottom: getPixelValue(style.marginBottom),
    left: getPixelValue(style.marginLeft),
    right: getPixelValue(style.marginRight),
    top: getPixelValue(style.marginTop),
  };
}

export function displayName(prefix, Component) {
  const componentName = Component.displayName || Component.name;

  return componentName ? `${prefix}(${componentName})` : prefix;
}

export function getPosition(event) {
  if (event.touches && event.touches.length) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY,
    };
  } else if (event.changedTouches && event.changedTouches.length) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    };
  } else {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }
}

export function getEdgeOffset(el, parent, offset = { left: 0, top: 0 }) {
  if (!el) {
    return undefined;
  }

  // Get the actual offsetTop / offsetLeft value, no matter how deep the el is nested
  const elOffset = {
    left: offset.left + el.offsetLeft,
    top: offset.top + el.offsetTop,
  };

  if (el.parentNode === parent) {
    return elOffset;
  }

  return getEdgeOffset(el.parentNode, parent, elOffset);
}

function isScrollable(el) {
  const computedStyle = window.getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];

  return properties.find(property =>
    overflowRegex.test(computedStyle[property]),
  );
}

export function getScrollingParent(el) {
  if (!(el instanceof HTMLElement)) {
    return null;
  } else if (isScrollable(el)) {
    return el;
  } else {
    return getScrollingParent(el.parentNode);
  }
}

export function getContainerGridGap(element) {
  const style = window.getComputedStyle(element);

  if (style.display === 'grid') {
    return {
      x: getPixelValue(style.gridColumnGap),
      y: getPixelValue(style.gridRowGap),
    };
  }

  return { x: 0, y: 0 };
}

const NodeType = {
  Anchor: 'A',
  Button: 'BUTTON',
  Canvas: 'CANVAS',
  Input: 'INPUT',
  Option: 'OPTION',
  Textarea: 'TEXTAREA',
  Select: 'SELECT',
};

export function cloneNode(el) {
  const selector = 'input, textarea, select, canvas, [contenteditable]';
  const fields = el.querySelectorAll(selector);
  const clonedNode = el.cloneNode(true);
  const clonedFields = [...clonedNode.querySelectorAll(selector)];

  clonedFields.forEach((field, i) => {
    if (field.type !== 'file') {
      field.value = fields[i].value;
    }

    // Fixes an issue with original radio buttons losing their value once the
    // clone is inserted in the DOM, as radio button `name` attributes must be unique
    if (field.type === 'radio' && field.name) {
      field.name = `__sortableClone__${field.name}`;
    }

    if (
      field.tagName === NodeType.Canvas &&
      fields[i].width > 0 &&
      fields[i].height > 0
    ) {
      const destCtx = field.getContext('2d');
      destCtx.drawImage(fields[i], 0, 0);
    }
  });

  return clonedNode;
}

const interactiveElements = [
  NodeType.Input,
  NodeType.Textarea,
  NodeType.Select,
  NodeType.Option,
  NodeType.Button,
];

export function shouldCancelStart(event) {
  if (event.button === 2) {
    return false;
  }

  if (interactiveElements.indexOf(event.target.tagName) !== -1) {
    return true;
  }

  if (closest(event.target, el => el.contentEditable === 'true')) {
    return true;
  }

  return false;
}
