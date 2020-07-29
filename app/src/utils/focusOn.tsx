export default function focusOn(id: string) {
  document.getElementById(id)?.click();
}

export function focusOnTodoWithIndex(index: number) {
  focusOn(`todo-text-${index}`);
}

export function focusOnBookmarkWithIndex(index: number) {
  focusOn(`bookmark-${index}`);
}
