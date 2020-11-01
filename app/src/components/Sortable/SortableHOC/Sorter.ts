import {
  cloneNode,
  getScrollingParent,
  getContainerGridGap,
  getEdgeOffset,
  getElementMargin,
  getPosition,
  setStyle,
  setTransitionDuration,
  setTranslate3d,
  addEventListener,
  removeEventListener,
  IBrowserEvent,
} from './utils';

import {
  ISortableElement,
  IAxis,
  IPosition,
  IBounds,
  IOffset,
  ISortChange,
} from './types';

import AutoScroller from './AutoScroller';
import Manager from './Manager';

interface ISorterOptions {
  manager: Manager;
  container: HTMLElement;
  el: ISortableElement;
  axis: IAxis;
  onComplete: (change: ISortChange) => void | Promise<any>;
  transitionDuration: number;
  event: IBrowserEvent;
}

export default class Sorter {
  manager: Manager;
  container: HTMLElement;
  el: HTMLElement;
  axis: IAxis;
  onComplete: (change: ISortChange) => void | Promise<any>;
  transitionDuration: number;

  initalIndex: number;
  newIndex: number | null;
  contentWindow: Window;
  scrollContainer: HTMLElement;

  margin: IPosition;
  elBounds: IBounds;
  containerBounds: IBounds;
  baseHelperX: number;
  baseHelperY: number;
  baseX: number;
  baseY: number;
  helper: HTMLElement;
  offset: IPosition = { x: 0, y: 0 };

  autoScroller: AutoScroller;
  listenerNode: HTMLElement | Window;

  constructor({
    manager,
    container,
    el,
    axis,
    onComplete,
    transitionDuration,
    event,
  }: ISorterOptions) {
    this.manager = manager;
    this.el = el;
    this.axis = axis;
    this.onComplete = onComplete;
    this.transitionDuration = transitionDuration;
    this.container = container;

    this.initalIndex = this.newIndex = el.sortableInfo.index;

    this.contentWindow =
      (container.ownerDocument || document).defaultView || window;

    this.scrollContainer = getScrollingParent(container) || container;

    const margin = getElementMargin(el);
    const gridGap = getContainerGridGap(container);
    const elBounds = el.getBoundingClientRect();

    this.elBounds = elBounds;

    this.margin = {
      x: elBounds.width + margin.left + margin.right + gridGap.x,
      y: elBounds.height + Math.max(margin.top, margin.bottom, gridGap.y),
    };

    this.containerBounds = this.scrollContainer.getBoundingClientRect();

    const initialOffset = getPosition(event);

    const offsetEdge = getEdgeOffset(el, container);

    this.baseHelperX = this.contentWindow.pageXOffset - initialOffset.x;
    this.baseHelperY = this.contentWindow.pageYOffset - initialOffset.y;

    this.baseX =
      offsetEdge.left - this.scrollContainer.scrollLeft - initialOffset.x;

    this.baseY =
      offsetEdge.top - this.scrollContainer.scrollTop - initialOffset.y;

    this.helper = document.body.appendChild(cloneNode(el)) as HTMLElement;

    setStyle(this.helper, {
      boxSizing: 'border-box',
      height: `${elBounds.height}px`,
      left: `${elBounds.left - margin.left}px`,
      pointerEvents: 'none',
      position: 'fixed',
      top: `${elBounds.top - margin.top}px`,
      width: `${elBounds.width}px`,
    });

    setStyle(el, {
      opacity: 0,
      visibility: 'hidden',
    });

    const minTranslate: Partial<IPosition> = {};
    const maxTranslate: Partial<IPosition> = {};

    if (this.axis.indexOf('x') !== -1) {
      minTranslate.x =
        this.containerBounds.left - elBounds.left - elBounds.width / 2;
      maxTranslate.x =
        this.containerBounds.left +
        this.containerBounds.width -
        elBounds.left -
        elBounds.width / 2;
    }

    if (this.axis.indexOf('y') !== -1) {
      minTranslate.y =
        this.containerBounds.top - elBounds.top - elBounds.height / 2;
      maxTranslate.y =
        this.containerBounds.top +
        this.containerBounds.height -
        elBounds.top -
        elBounds.height / 2;
    }

    this.autoScroller = new AutoScroller({
      container: this.scrollContainer,
      onScroll: this.onScroll,
      maxTranslate: maxTranslate as IPosition,
      minTranslate: minTranslate as IPosition,
      height: elBounds.height,
      width: elBounds.width,
    });

    this.manager.sortedItems().forEach((sortable) => {
      sortable.el.bounds = {
        height: Math.min(sortable.el.offsetHeight, elBounds.height) / 2,
        width: Math.min(sortable.el.offsetWidth, elBounds.width) / 2,
        ...getEdgeOffset(sortable.el, container),
      };

      setTransitionDuration(sortable.el, transitionDuration);
    });

    this.listenerNode = event.touches ? el : this.contentWindow;

    addEventListener(this.listenerNode, 'move', this.onMove);
    addEventListener(this.listenerNode, 'end', this.onEnd);
  }

  onScroll = (offset: IOffset) => {
    this.offset.x += offset.left;
    this.offset.y += offset.top;

    this._sort();
  };

  onMove = (event: IBrowserEvent) => {
    // Prevent scrolling on mobile
    if (typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    this.offset = getPosition(event);

    const position = {
      x: this.baseHelperX + this.offset.x - this.contentWindow.pageXOffset,
      y: this.baseHelperY + this.offset.y - this.contentWindow.pageYOffset,
    };

    setTranslate3d(this.helper, position);

    this.autoScroller.update(position);

    this._sort();
  };

  onEnd = async () => {
    removeEventListener(this.listenerNode, 'move', this.onMove);
    removeEventListener(this.listenerNode, 'end', this.onEnd);

    await this.onComplete({
      newIndex: this.newIndex!,
      oldIndex: this.initalIndex,
    });

    this.helper.parentNode?.removeChild(this.helper);

    setStyle(this.el, {
      opacity: '',
      visibility: '',
    });

    this.manager.sortedItems().forEach(({ el }) => {
      el.bounds = null;

      setTranslate3d(el, null);
      setTransitionDuration(el, null);
    });

    this.autoScroller.stop();

    this.manager.invalidateCache();
  };

  _sort() {
    const delta = {
      left: this.baseX + this.offset.x + this.scrollContainer.scrollLeft,
      top: this.baseY + this.offset.y + this.scrollContainer.scrollTop,
    };

    const focused = this.newIndex === null ? this.initalIndex : this.newIndex;

    this.newIndex = null;

    const items = this.manager.sortedItems();

    for (
      let i = Math.max(0, focused - 1),
        len = Math.min(focused + 2, items.length);
      i < len;
      i++
    ) {
      const { el } = items[i];
      const { index } = el.sortableInfo;

      if (index === this.initalIndex) {
        continue;
      }

      const bounds = this._getBounds(el);

      const position = {
        x: 0,
        y: 0,
      };

      if (this.axis === 'x') {
        if (
          index > this.initalIndex &&
          delta.left + bounds.width >= bounds.left
        ) {
          position.x -= this.margin.x;
          this.newIndex = index;
        } else if (
          index < this.initalIndex &&
          delta.left <= bounds.left + bounds.width
        ) {
          position.x = this.margin.x;

          if (this.newIndex == null) {
            this.newIndex = index;
          }
        }
      } else if (this.axis === 'y') {
        if (
          index > this.initalIndex &&
          delta.top + bounds.height >= bounds.top
        ) {
          position.y -= this.margin.y;
          this.newIndex = index;
        } else if (
          index < this.initalIndex &&
          delta.top <= bounds.top + bounds.height
        ) {
          position.y = this.margin.y;

          if (this.newIndex == null) {
            this.newIndex = index;
          }
        }
      } else if (this.axis === 'xy') {
        if (
          index < this.initalIndex &&
          ((delta.left - bounds.width <= bounds.left &&
            delta.top <= bounds.top + bounds.height) ||
            delta.top + bounds.height <= bounds.top)
        ) {
          // If the current node is to the left on the same row, or above the node that's being dragged
          // then move it to the right
          position.x = this.margin.x;
          if (
            bounds.left + position.x >
            this.containerBounds.width - bounds.width
          ) {
            // If it moves passed the right bounds, then animate it to the first position of the next row.
            // We just use the offset of the next node to calculate where to move, because that node's original position
            // is exactly where we want to go
            const nextNode = items[i + 1];
            if (nextNode) {
              const nextBounds = this._getBounds(nextNode.el);
              position.x = nextBounds.left - bounds.left;
              position.y = nextBounds.top - bounds.top;
            }
          }

          if (this.newIndex === null) {
            this.newIndex = index;
          }
        } else if (
          index > this.initalIndex &&
          ((delta.left + bounds.width >= bounds.left &&
            delta.top + bounds.height >= bounds.top) ||
            delta.top + bounds.height >= bounds.top + el.offsetHeight)
        ) {
          // If the current node is to the right on the same row, or below the node that's being dragged
          // then move it to the left
          position.x -= this.margin.x;
          if (
            bounds.left + position.x <
            this.containerBounds.left + bounds.width
          ) {
            // If it moves passed the left bounds, then animate it to the last position of the previous row.
            // We just use the offset of the previous node to calculate where to move, because that node's
            // original position is exactly where we want to go
            const prevNode = items[i - 1];
            if (prevNode) {
              const prevBounds = this._getBounds(prevNode.el);
              position.x = prevBounds.left - bounds.left;
              position.y = prevBounds.top - bounds.top;
            }
          }

          this.newIndex = index;
        }
      }

      setTranslate3d(el, position);
    }

    if (this.newIndex == null) {
      this.newIndex = this.initalIndex;
    }
  }

  _getBounds(el: ISortableElement): IBounds {
    if (el.bounds) {
      return el.bounds;
    }

    el.bounds = {
      height: Math.min(el.offsetHeight, this.elBounds.height) / 2,
      width: Math.min(el.offsetWidth, this.elBounds.width) / 2,
      ...getEdgeOffset(el, this.container),
    };

    setTransitionDuration(el, this.transitionDuration);

    return el.bounds;
  }
}
