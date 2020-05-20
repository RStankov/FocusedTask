import React from 'react';
import Section from 'components/Section';
import Stack from 'components/Stack';
import TaskTitle from 'components/TaskTitle';
import TaskTodos from 'components/TaskTodos';
import TaskBookmarks from 'components/TaskBookmarks';
import TaskNote from 'components/TaskNote';
import { newBookmark } from 'modules/task';
import useShortcuts from 'hooks/useShortcuts';
import useDispatch from 'hooks/useDispatch';
import AppMenu from 'components/AppMenu';
import useDragAndDropFiles from 'hooks/useDragAndDropFiles';

export default function Task() {
  const dispatch = useDispatch();

  useShortcuts();
  useDragAndDropFiles();

  return (
    <div>
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
