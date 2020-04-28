import React from 'react';
import { useDispatch } from 'react-redux';
import Section from 'components/Section';
import Stack from 'components/Stack';
import TaskTitle from 'components/TaskTitle';
import TaskTodos from 'components/TaskTodos';
import TaskBookmarks from 'components/TaskBookmarks';
import TaskNote from 'components/TaskNote';
import { newBookmark } from 'modules/task';
import useShortcuts from 'hooks/useShortcuts';
import AppMenu from 'components/AppMenu';

export default function Task() {
  const dispatch = useDispatch();

  useShortcuts();

  return (
    <>
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
    </>
  );
}
