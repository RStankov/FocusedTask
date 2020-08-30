import React from 'react';
import Section from 'components/Section';
import Stack from 'components/Stack';
import TaskTitle from './Title';
import TaskTodos from './Todos';
import TaskBookmarks from './Bookmarks';
import TaskNote from './Note';
import useShortcuts from 'hooks/useShortcuts';
import AppMenu from 'components/AppMenu';
import useDragAndDropFiles from 'hooks/useDragAndDropFiles';
import DragFileMessage from './DragFileMessage';

export default function Task() {
  useShortcuts();
  const isDragingFile = useDragAndDropFiles();

  return (
    <>
      {isDragingFile && <DragFileMessage />}
      <AppMenu />
      <Stack.Column gap="l">
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
