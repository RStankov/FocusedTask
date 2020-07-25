export function newTask() {
  return { type: 'tasks/new' };
}

export function selectTask(task: { id: string }) {
  return { type: 'tasks/select', payload: { task } };
}

export function deleteTask(task: { id: string }) {
  return { type: 'tasks/delete', payload: { task } };
}
