import React from 'react';
import Section from 'components/Section';
import Stack from 'components/Stack';
import TaskTitle from './Title';
import TaskTodos from './Todos';
import TaskBookmarks from './Bookmarks';
import TaskNote from './Note';
import { newBookmark } from 'modules/task';
import useShortcuts from 'hooks/useShortcuts';
import useDispatch from 'hooks/useDispatch';
import AppMenu from 'components/AppMenu';
import useDragAndDropFiles from 'hooks/useDragAndDropFiles';
import DragFileMessage from './DragFileMessage';
import Button from 'components/Button';
import focusOn from 'utils/focusOn';

export default function Task() {
  const dispatch = useDispatch();

  useShortcuts();
  const isDragingFile = useDragAndDropFiles();

  return (
    <div>
      {isDragingFile && <DragFileMessage />}
      <AppMenu />
      <Stack.Column gap="m">
        <TaskTitle />
        <Section emoji="🔜" title="Todos">
          <TaskTodos />
        </Section>
        <Section
          emoji="📌"
          title="Bookmarks"
          actions={
            <Button
              onClick={() => dispatch(newBookmark())}
              title="New Bookmark">
              +
            </Button>
          }>
          <TaskBookmarks />
        </Section>
        <Section
          emoji="📝"
          title="Notes"
          onTitleClick={() => focusOn('note-text')}>
          <TaskNote />
        </Section>
      </Stack.Column>
    </div>
  );
}
