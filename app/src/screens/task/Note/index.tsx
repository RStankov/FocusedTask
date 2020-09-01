import React from 'react';
import Input from 'components/Input';
import { updateNote } from 'modules/task';
import { getNote } from 'modules/selectors';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';
import Stack from 'components/Stack';
import AddButton from 'components/AddButton';
import focusOn from 'utils/focusOn';

export default function TaskNote() {
  const note = useSelector(getNote);
  const dispatch = useDispatch();
  const [showNewButton, setShowNewButton] = React.useState(!note);

  return (
    <>
      {showNewButton && (
        <AddButton onClick={() => focusOn('note-text')} subject="note" />
      )}
      <Stack.Row>
        <Input
          id="note-text"
          value={note}
          multiline={true}
          autoFocus={false}
          onStartEditing={() => {
            setShowNewButton(false);
          }}
          onChange={value => {
            dispatch(updateNote(value));
            setShowNewButton(!value);
          }}
        />
      </Stack.Row>
    </>
  );
}
