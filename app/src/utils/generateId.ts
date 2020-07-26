import { uniqueId } from 'lodash';

export default function generateId(name: string) {
  return uniqueId(`${name}-`) + +new Date();
}
