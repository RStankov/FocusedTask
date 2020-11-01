export type ISortableElement = HTMLElement & {
  sortableInfo: { index: number };
  bounds?: IBounds | null;
};

export type IAxis = 'x' | 'y' | 'xy';

export type IPosition = {
  x: number;
  y: number;
};

export type IOffset = {
  left: number;
  top: number;
};

export type IBounds = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export interface ISortChange {
  oldIndex: number;
  newIndex: number;
}
