const IS_URL = /^https?:\/\/.+\..+$/;
const IS_LOCALHOST = /^https?:\/\/localhost.*$/;
const IS_FILE_PATH = /^\/.*$/;
const IS_X_CALLBACK = /^[a-z]+:\/\/x-callback-url\/.*$/;

const MATCHERS = [IS_URL, IS_LOCALHOST, IS_X_CALLBACK];

export default function isURI(uri: string) {
  return uri && !!MATCHERS.find((matcher) => uri.match(matcher));
}

export function isFilePathUri(uri: string) {
  return !!uri.match(IS_FILE_PATH);
}
