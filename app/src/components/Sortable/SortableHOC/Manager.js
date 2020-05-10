export default class Manager {
  _items = [];
  cache = null;

  add(ref) {
    this._items.push(ref);
    this._cache = null;
  }

  remove(ref) {
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

    return (this.cache = this._items.sort(sortByIndex));
  }
}

function sortByIndex(
  {
    el: {
      sortableInfo: { index: index1 },
    },
  },
  {
    el: {
      sortableInfo: { index: index2 },
    },
  },
) {
  return index1 - index2;
}
