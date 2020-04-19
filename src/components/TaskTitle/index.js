import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Emoji from 'components/Emoji';

import { updateTaskTitle } from 'modules/task';

export default function TaskTitle() {
  const [editing, setEditing] = React.useState(false);
  const task = useSelector(store => store.task);
  const dispatch = useDispatch();

  return (
    <h1 onDoubleClick={() => setEditing(true)}>
      <Emoji emoji="🎯" />
      {editing ? (
        <input
          autoFocus={true}
          type="text"
          defaultValue={task.title}
          onKeyDown={e => {
            if (e.keyCode === 27) {
              setEditing(false);
            } else if (e.target.value !== '' && e.keyCode === 13) {
              dispatch(updateTaskTitle(e.target.value));
              setEditing(false);
            }
          }}
        />
      ) : (
        task.title
      )}
    </h1>
  );
}
