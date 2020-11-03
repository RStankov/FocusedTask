import { openURI } from 'utils/electron';
import isURI from 'utils/isURI';

interface IBookmark {
  uri: string;
}

export function openBookmark(bookmark?: IBookmark) {
  if (!bookmark) {
    return;
  }

  const uri = bookmarkUri(bookmark);

  if (uri) {
    openURI(uri);
  }
}

export function bookmarkUri({ uri }: IBookmark) {
  if (uri.includes(' ')) {
    uri = uri.split(' ')[1];
  }

  if (isURI(uri)) {
    return uri;
  }

  return null;
}
