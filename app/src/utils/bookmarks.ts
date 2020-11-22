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

const FILE_PATH = /(^| )\/.*$/;

export function bookmarkUri({ uri }: IBookmark) {
  const fileMatch = uri.match(FILE_PATH);
  if (fileMatch) {
    return fileMatch[0].trim();
  }

  if (uri.includes(' ')) {
    uri = last(uri.split(' ')) || '';
  }

  if (isURI(uri)) {
    return uri;
  }

  return null;
}

export function bookmarkTitle(text: string) {
  const fileMatch = text.match(FILE_PATH);
  if (fileMatch) {
    if (fileMatch[0][0] === ' ') {
      return text.replace(fileMatch[0], ' ↗️');
    }
  }

  if (text.includes(' ')) {
    const chunks = text.split(' ');
    const last = chunks.splice(-1)[0] || '';
    if (isURI(last)) {
      text = chunks.join(' ') + ' ↗️';
    }
  }

  return text;
}
