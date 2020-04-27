import { uniqueId } from 'lodash';

export function createTodo({ after, text = '' } = {}) {
  return {
    id: uniqueId('todo_') + new Date(),
    text: text || '',
    isCompleted: false,
    autoFocus: true,
    autoCompleted: false,
    ident: after ? after.ident : 0,
  };
}

export function createBookmark({ uri = '' } = {}) {
  return {
    id: uniqueId('bookmark_') + new Date(),
    autoFocus: true,
    uri,
  };
}

export function findIndex(collection, item) {
  return collection.findIndex(({ id }) => id === item.id);
}

export function find(collection, item) {
  return collection.find(({ id }) => id === item.id);
}

export function insertAfter(collection, after, item) {
  const insertAt = after ? findIndex(collection, after) : -1;

  if (insertAt === -1) {
    collection.push(item);
  } else {
    collection.splice(insertAt + 1, 0, item);
  }
}

export function move(collection, item, by) {
  const index = findIndex(collection, item);
  const newIndex = index + by;

  if (!collection[index] || !collection[newIndex]) {
    return;
  }

  const temp = collection[index];
  collection[index] = collection[newIndex];
  collection[newIndex] = temp;
}

export function paste(collection, payload, fnUpdate, fnNew) {
  const [first, ...rest] = payload.clipboard
    .split('\n')
    .map(s => s.replace(/^[\W]*(-|\*) (\[( |x)\] )?/, ''));

  const item = collection.find(({ id }) => id === payload.id);

  fnUpdate(item, first);

  let after = find(collection, payload);
  rest.reverse().forEach(text => {
    insertAfter(collection, after, fnNew({ after, text }));
  });
}
