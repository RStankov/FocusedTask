import * as React from 'react';
import useEventListener from 'hooks/useEventListener';
import { newBookmarkBatch } from 'modules/task';
import useDispatch from 'hooks/useDispatch';
import { map } from 'lodash';

export default function useDragAndDropFiles() {
  const dispatch = useDispatch();

  const [isDraging, setIsDraging] = React.useState(false);

  const onDrag = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isDraging) {
      setIsDraging(true);
    }
  };

  const onDragEnd = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isDraging) {
      setIsDraging(false);
    }
  };

  useEventListener('dragover', onDrag);
  useEventListener('drop', onDrag);
  useEventListener('dragleave', onDragEnd);
  useEventListener('dragend', onDragEnd);

  useEventListener(
    'drop',
    (e: any) => {
      e.preventDefault();
      const uris = map(e.dataTransfer.files, (f: any) => f.path);

      dispatch(newBookmarkBatch({ uris: uris }));

      setIsDraging(false);
    },
    document.body,
  );

  return isDraging;
}
