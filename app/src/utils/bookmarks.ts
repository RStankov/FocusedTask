import { openURI } from 'utils/electron';
import isURI from 'utils/isURI';
import { last } from 'lodash';

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
    uri = last(uri.split(' ')) || '';
  }

  if (isURI(uri)) {
    return uri;
  }

  return null;
}

export function bookmarkTitle(text: string) {
  if (text.includes(' ')) {
    const chunks = text.split(' ');
    const last = chunks.splice(-1)[0] || '';
    if (isURI(last)) {
      text = chunks.join(' ') + ' ↗️';
    }
  }

  return text;
}
