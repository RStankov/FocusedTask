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
