import * as React from 'react';
import Section from 'components/Section';
import Stack from 'components/Stack';
import TaskTitle from './Title';
import TaskTodos from './Todos';
import TaskBookmarks from './Bookmarks';
import TaskNote from './Note';
import AppMenu from 'components/AppMenu';
import useDragAndDropFiles from 'hooks/useDragAndDropFiles';
import DragFileMessage from './DragFileMessage';

export default function Task() {
  const isDraggingFile = useDragAndDropFiles();

  return (
    <>
      {isDraggingFile && <DragFileMessage />}
      <AppMenu />
      <Stack.Column gap="xl">
        <TaskTitle />
        <Section emoji="🔜" title="Todos">
          <TaskTodos />
        </Section>
        <Section emoji="📌" title="Bookmarks">
          <TaskBookmarks />
        </Section>
        <Section emoji="📝" title="Notes">
          <TaskNote />
        </Section>
      </Stack.Column>
    </>
  );
}
