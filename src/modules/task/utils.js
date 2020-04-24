import { uniqueId } from 'lodash';

export function insertAfter(collection, after, item) {
  const insertAt = after ? collection.findIndex(t => t.id === after.id) : -1;

  if (insertAt === -1) {
    collection.push(item);
  } else {
    collection.splice(insertAt + 1, 0, item);
  }
}

export function update(collection, action, update) {
  collection.forEach(item => {
    if (item.id === action.payload.id) {
      update(item);
    }
  });
}

export function paste(collection, action, fnUpdate, fnNew) {
  // TODO(rstankov): clear markdown
  const [first, ...rest] = action.payload.clipboard.split('\n');

  update(collection, action, item => fnUpdate(item, first));

  let after = collection.find(i => i.id === action.payload.id);
  rest.forEach(text => {
    insertAfter(collection, after, fnNew({ after, text }));
  });
}

export function createTodo({ after, text = '' } = {}) {
  return {
    id: uniqueId('todo_') + new Date(),
    text: text || '',
    isCompleted: false,
    ident: after ? after.ident : 0,
  };
}

export function createBookmark({ uri = '' } = {}) {
  return {
    id: uniqueId('bookmark_') + new Date(),
    uri,
  };
}
