import useEventListener from 'hooks/useEventListener';
import { useSelector, useDispatch } from 'react-redux';
import keyCodes from 'utils/keyCodes';
import { openURI } from 'utils/electron';
import focusOn from 'utils/focusOn';

import { newTodo, newBookmark } from 'modules/task';

export default function useGlobalShortcuts() {
  const dispatch = useDispatch();
  const bookmarks = useSelector(store => store.task.bookmarks);

  useEventListener('keydown', e => {
    if (e.metaKey && e.keyCode === keyCodes.t) {
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
    }
  });
}
