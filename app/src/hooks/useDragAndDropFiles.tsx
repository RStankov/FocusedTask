import useEventListener from 'hooks/useEventListener';
import { newBookmarkBatch } from 'modules/task';
import useDispatch from 'hooks/useDispatch';
import { map } from 'lodash';

export default function useDragAndDropFiles() {
  const dispatch = useDispatch();
  useEventListener('dragover', preventDefault);
  useEventListener('drop', preventDefault);

  useEventListener('drop', (e: any) => {
    e.preventDefault();
    const uris = map(e.dataTransfer.files, (f: any) => f.path);

    dispatch(newBookmarkBatch({ uris: uris }));
  });
}

function preventDefault(e: { preventDefault: () => void }) {
  e.preventDefault();
}
