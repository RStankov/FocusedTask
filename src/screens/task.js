import React from 'react';
import { useDispatch } from 'react-redux';
import Section from 'components/Section';
import Stack from 'components/Stack';
import TaskTitle from 'components/TaskTitle';
import TaskTodos from 'components/TaskTodos';
import TaskBookmarks from 'components/TaskBookmarks';
import TaskNote from 'components/TaskNote';
import { newBookmark } from 'modules/task';
import useGlobalShortcuts from 'hooks/useGlobalShortcuts';

export default function App() {
  const dispatch = useDispatch();

  useGlobalShortcuts();

  return (
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
  );
}
