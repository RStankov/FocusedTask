import focusOn, { focusOnTodoWithIndex } from 'utils/focusOn';
import keyCodes from 'utils/keyCodes';
import useEventListener from 'hooks/useEventListener';
import { openURI, hideApp } from 'utils/electron';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';

import { newTodo, newBookmark } from 'modules/task';
import { getBookmarks, getTodos } from 'modules/selectors';
import { undo, redo } from 'modules/actions';

export default function useShortcuts() {
  const dispatch = useDispatch();
  const bookmarks = useSelector(getBookmarks);
  const todos = useSelector(getTodos);

  useEventListener('keydown', e => {
    if (e.metaKey && e.shiftKey && e.keyCode === keyCodes.t) {
      const index = todos.findIndex(t => !t.isCompleted);
      if (index === -1) {
        dispatch(newTodo());
      } else {
        focusOnTodoWithIndex(index);
      }
    } else if (e.metaKey && !e.shiftKey && e.keyCode === keyCodes.t) {
      dispatch(newTodo());
    } else if (e.metaKey && e.keyCode === keyCodes.b) {
      dispatch(newBookmark());
    } else if (e.metaKey && e.keyCode === keyCodes.n) {
      focusOn('note-text');
    } else if (e.metaKey && e.keyCode === keyCodes['1']) {
      openURI(bookmarks[0]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['2']) {
      openURI(bookmarks[1]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['3']) {
      openURI(bookmarks[2]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['4']) {
      openURI(bookmarks[3]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['5']) {
      openURI(bookmarks[4]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['6']) {
      openURI(bookmarks[5]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['7']) {
      openURI(bookmarks[6]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['8']) {
      openURI(bookmarks[7]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['9']) {
      openURI(bookmarks[8]?.uri);
    } else if (e.metaKey && e.keyCode === keyCodes['0']) {
      openURI(bookmarks[bookmarks.length - 1]?.uri);
    } else if (e.keyCode === keyCodes.esc && e.target.tagName !== 'INPUT') {
      hideApp();
    } else if (e.metaKey && e.keyCode === keyCodes.z) {
      if (
        e.target.tagName.toUpperCase() !== 'TEXTAREA' &&
        e.target.tagName.toUpperCase() !== 'INPUT'
      ) {
        if (e.shiftKey) {
          dispatch(redo());
        } else {
          dispatch(undo());
        }
      }
    }
  });
}
