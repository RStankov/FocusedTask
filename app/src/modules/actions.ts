export function newTask() {
  return { type: 'tasks/new' };
}

export function selectTask(task: { id: string }) {
  return { type: 'tasks/select', payload: { task } };
}

export function nextTask() {
  return { type: 'tasks/next' };
}

export function deleteTask(task: { id: string }) {
  return { type: 'tasks/delete', payload: { task } };
}

export function importTask(task: any) {
  return { type: 'tasks/import', payload: { task } };
}

export function undo() {
  return { type: 'tasks/undo' };
}

export function redo() {
  return { type: 'tasks/redo' };
}
