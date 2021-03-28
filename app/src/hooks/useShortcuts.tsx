import * as React from 'react';

import focusOn, { focusOnTodoWithIndex } from 'utils/focusOn';
import keyCodes from 'utils/keyCodes';
import useEventListener from 'hooks/useEventListener';
import { hideApp, taskSwitchSubscribe } from 'utils/electron';
import { openBookmark } from 'utils/bookmarks';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';

import { newTodo, newBookmark } from 'modules/task';
import { getSelectedScreen, getBookmarks, getTodos } from 'modules/selectors';
import { undo, redo, nextTask } from 'modules/actions';
import { openShortcuts, openTask } from 'modules/selectedScreen';

export default function useShortcuts() {
  const dispatch = useDispatch();
  const bookmarks = useSelector(getBookmarks);
  const todos = useSelector(getTodos);
  const selectedScreen = useSelector(getSelectedScreen);

  React.useEffect(() => {
    return taskSwitchSubscribe(() => {
      dispatch(nextTask());
    });
  }, [dispatch]);

  useEventListener('keydown', (e) => {
    if (selectedScreen !== 'task') {
      if (e.keyCode === keyCodes.esc) {
        dispatch(openTask());
      }
    } else if (selectedScreen === 'task') {
      if (e.metaKey && e.shiftKey && e.keyCode === keyCodes.t) {
        const index = todos.findIndex((t) => !t.isCompleted);
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
      } else if (e.metaKey && e.keyCode === keyCodes.e) {
        focusOn('title-text');
      } else if (e.metaKey && e.keyCode === keyCodes.h) {
        dispatch(openShortcuts());
      } else if (e.metaKey && e.keyCode === keyCodes['1']) {
        openBookmark(bookmarks[0]);
      } else if (e.metaKey && e.keyCode === keyCodes['2']) {
        openBookmark(bookmarks[1]);
      } else if (e.metaKey && e.keyCode === keyCodes['3']) {
        openBookmark(bookmarks[2]);
      } else if (e.metaKey && e.keyCode === keyCodes['4']) {
        openBookmark(bookmarks[3]);
      } else if (e.metaKey && e.keyCode === keyCodes['5']) {
        openBookmark(bookmarks[4]);
      } else if (e.metaKey && e.keyCode === keyCodes['6']) {
        openBookmark(bookmarks[5]);
      } else if (e.metaKey && e.keyCode === keyCodes['7']) {
        openBookmark(bookmarks[6]);
      } else if (e.metaKey && e.keyCode === keyCodes['8']) {
        openBookmark(bookmarks[7]);
      } else if (e.metaKey && e.keyCode === keyCodes['9']) {
        openBookmark(bookmarks[8]);
      } else if (e.metaKey && e.keyCode === keyCodes['0']) {
        openBookmark(bookmarks[bookmarks.length - 1]);
      } else if (e.keyCode === keyCodes.esc && !isInput(e)) {
        hideApp();
      } else if (e.metaKey && e.keyCode === keyCodes.z) {
        if (!isInput(e)) {
          if (e.shiftKey) {
            dispatch(redo());
          } else {
            dispatch(undo());
          }
        }
      }
    }
  });
}

function isInput(e: { target: { tagName: string } }) {
  return (
    e.target.tagName.toUpperCase() === 'TEXTAREA' ||
    e.target.tagName.toUpperCase() === 'INPUT'
  );
}
