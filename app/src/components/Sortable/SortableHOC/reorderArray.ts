import { ISortChange } from './types';

export default function reorderArray<T = any>(
  array: T[],
  { oldIndex, newIndex }: ISortChange,
): T[] {
  const newArray = [...array];
  const item = newArray[oldIndex];

  newArray.splice(oldIndex, 1);
  newArray.splice(newIndex, 0, item);

  return newArray;
}
