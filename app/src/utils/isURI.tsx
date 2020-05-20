const IS_URL = /https?:\/\/.+\..+/;
const IS_LOCALHOST = /https?:\/\/localhost.*/;
const IS_FILE_PATH = /^\/.*/;

export default function isURI(uri: string) {
  return (
    uri &&
    (!!uri.match(IS_URL) ||
      !!uri.match(IS_LOCALHOST) ||
      !!uri.match(IS_FILE_PATH))
  );
}

export function isFilePathUri(uri: string) {
  return !!uri.match(IS_FILE_PATH);
}
