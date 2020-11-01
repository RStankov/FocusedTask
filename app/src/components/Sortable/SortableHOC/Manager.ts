import { ISortableElement } from './types';

interface IRef {
  el: ISortableElement;
}

export default class Manager {
  _items: IRef[] = [];
  cache: IRef[] | null = null;

  add(ref: IRef) {
    this._items.push(ref);
  }

  remove(ref: IRef) {
    const index = this._items.indexOf(ref);

    if (index !== -1) {
      this._items.splice(index, 1);
      this.cache = null;
    }
  }

  invalidateCache() {
    this.cache = null;
  }

  sortedItems() {
    if (this.cache) {
      return this.cache;
    }

    this.cache = this._items.sort(sortByIndex);

    return this.cache;
  }
}

function sortByIndex(
  {
    el: {
      sortableInfo: { index: index1 },
    },
  }: IRef,
  {
    el: {
      sortableInfo: { index: index2 },
    },
  }: IRef,
) {
  return index1 - index2;
}
