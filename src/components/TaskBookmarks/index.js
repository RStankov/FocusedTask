import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import InputText from 'components/InputText';
import styles from './styles.module.css';
import ExternalLink from 'components/ExternalLink';
import keyCodes from 'utils/keyCodes';
import focusOn from 'utils/focusOn';

import {
  updateBookmark,
  removeBookmark,
  newBookmark,
  pasteBookmarks,
} from 'modules/task';

export default function TaskBookmarks() {
  const bookmarks = useSelector(store => store.task.bookmarks);
  const dispatch = useDispatch();

  return (
    <Stack.Column gap="xs">
      {bookmarks.map((bookmark, i) => (
        <Stack.Row key={bookmark.id} className={styles.row}>
          {isUrl(bookmark) ? (
            <ExternalLink href={bookmark.uri} className={styles.number}>
              {i < 9 ? i + 1 : i === bookmarks.length - 1 ? 0 : ''}
            </ExternalLink>
          ) : (
            <div className={styles.inactive} />
          )}
          <InputText
            type="text"
            id={`bookmark-${i}`}
            autoFocus={true}
            value={bookmark.uri}
            placeholder="https://example.com"
            onChange={e =>
              dispatch(updateBookmark({ id: bookmark.id, uri: e.target.value }))
            }
            onPaste={e => {
              const clipboard = e.clipboardData.getData('Text');

              if (clipboard.indexOf('\n') === -1) {
                return;
              }

              e.preventDefault();

              dispatch(pasteBookmarks({ id: bookmark.id, clipboard }));
            }}
            onKeyDown={e => {
              if (e.target.value === '' && e.keyCode === keyCodes.backspace) {
                dispatch(removeBookmark(bookmark));
                focusOnBookmarkWithIndex(i - 1);
              } else if (
                e.target.value !== '' &&
                e.keyCode === keyCodes.enter
              ) {
                dispatch(newBookmark({ after: bookmark }));
              } else if (e.keyCode === keyCodes.esc) {
                e.target.blur();
              } else if (e.keyCode === keyCodes.up) {
                focusOnBookmarkWithIndex(i - 1);
              } else if (e.keyCode === keyCodes.down) {
                focusOnBookmarkWithIndex(i + 1);
              }
            }}
            onBlur={() => !bookmark.uri && dispatch(removeBookmark(bookmark))}
          />
          {isUrl(bookmark) && (
            <ExternalLink href={bookmark.uri} className={styles.link}>
              <Emoji emoji="↗️" />
            </ExternalLink>
          )}
        </Stack.Row>
      ))}
    </Stack.Column>
  );
}

function isUrl(bookmark) {
  return bookmark.uri && !!bookmark.uri.match(/https?:\/\/.+\..+/);
}

function focusOnBookmarkWithIndex(index) {
  focusOn(`bookmark-${index}`);
}
