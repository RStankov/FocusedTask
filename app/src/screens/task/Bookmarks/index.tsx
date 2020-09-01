import React from 'react';
import Stack from 'components/Stack';
import keyCodes from 'utils/keyCodes';
import { focusOnBookmarkWithIndex } from 'utils/focusOn';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';
import { openURI } from 'utils/electron';
import Sortable from 'components/Sortable';
import Input from 'components/Input';
import isURI from 'utils/isURI';
import { getBookmarks } from 'modules/selectors';
import BookmarkOpenLink from './OpenLink';
import AddButton from 'components/AddButton';

import {
  updateBookmark,
  removeBookmark,
  newBookmark,
  pasteBookmarks,
  moveBookmark,
} from 'modules/task';

export default function TaskBookmarks() {
  const bookmarks = useSelector(getBookmarks);
  const dispatch = useDispatch();

  return (
    <Stack.Column>
      <Sortable.List
        useDragHandle={true}
        onSort={({ oldIndex, newIndex }: any) =>
          dispatch(
            moveBookmark({
              id: bookmarks[oldIndex]!.id,
              by: newIndex - oldIndex,
            }),
          )
        }>
        {bookmarks.map((bookmark, i) => (
          <Sortable.Item
            index={i}
            align="start"
            gap="m"
            key={bookmark.id}
            onClick={(e: any) => {
              if (e.metaKey && isURI(bookmark.uri)) {
                e.preventDefault();
                e.stopPropagation();
                openURI(bookmark.uri);
              }
            }}>
            <BookmarkOpenLink
              uri={bookmark.uri}
              index={i < 9 ? i + 1 : i === bookmarks.length - 1 ? 0 : null}
            />
            <Input
              id={'bookmark-' + i}
              value={bookmark.uri}
              placeholder="https://example.com"
              onChange={value =>
                dispatch(updateBookmark({ id: bookmark.id, uri: value }))
              }
              onPaste={clipboard => {
                dispatch(pasteBookmarks({ id: bookmark.id, clipboard }));
              }}
              onKeyDown={e => {
                if (
                  e.keyCode === keyCodes.backspace &&
                  (e.target.value === '' || e.metaKey)
                ) {
                  e.preventDefault();
                  dispatch(removeBookmark(bookmark));
                  focusOnBookmarkWithIndex(i - 1);
                } else if (e.keyCode === keyCodes.enter) {
                  dispatch(newBookmark({ after: bookmark }));
                } else if (e.keyCode === keyCodes.esc) {
                  e.target.blur();
                } else if (!e.metaKey && e.keyCode === keyCodes.up) {
                  focusOnBookmarkWithIndex(i - 1);
                } else if (!e.metaKey && e.keyCode === keyCodes.down) {
                  focusOnBookmarkWithIndex(i + 1);
                } else if (e.metaKey && e.keyCode === keyCodes.up) {
                  dispatch(moveBookmark({ id: bookmark.id, by: -1 }));
                } else if (e.metaKey && e.keyCode === keyCodes.down) {
                  dispatch(moveBookmark({ id: bookmark.id, by: +1 }));
                }
              }}
            />
          </Sortable.Item>
        ))}
      </Sortable.List>
      <AddButton
        onClick={() => dispatch(newBookmark())}
        subject={bookmarks.length === 0 ? 'bookmark' : 'another'}
      />
    </Stack.Column>
  );
}
