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
          actions={<button onClick={() => dispatch(newBookmark())}>+</button>}>
          <TaskBookmarks />
        </Section>
        <Section emoji="📝" title="Notes">
          <TaskNote />
        </Section>
      </Stack.Column>
    </div>
  );
}
