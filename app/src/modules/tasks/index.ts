import taskReducer, { ITask } from '../task';

type IState = {
  tasks: { [key: string]: ITask };
  selected: string;
  undo: {
    lastAction: string | null;
    past: ITask[];
    future: ITask[];
  };
};

interface IAction {
  type: string;
  payload?: any;
}

const MAX_UNDO = 100;

const UNDO_SKIP_ACTIONS = {
  'task/updateTodoText': 'task/newTodo',
  'task/updateBookmark': 'task/newBookmark',
} as any;

const task = taskReducer(undefined as any, {} as any);

const emptyUndo = {
  lastAction: null,
  past: [],
  future: [],
};

const initialState: IState = {
  tasks: { [task.id]: task },
  selected: task.id,
  undo: emptyUndo,
};

export default function tasksReducer(
  state = initialState,
  action: IAction,
): IState {
  const { past, future } = state.undo || {};

  switch (action.type) {
    case 'tasks/new':
      const newTask = taskReducer(undefined as any, { type: 'reset' });

      return {
        selected: newTask.id,
        tasks: {
          ...state.tasks,
          [newTask.id]: newTask,
        },
        undo: emptyUndo,
      };

    case 'tasks/select':
      if (!state.tasks[action.payload.task.id]) {
        return state;
      }

      return {
        selected: action.payload.task.id,
        tasks: state.tasks,
        undo: emptyUndo,
      };

    case 'tasks/delete':
      if (!state.tasks[action.payload.task.id]) {
        return state;
      }

      const tasks = { ...state.tasks };

      Reflect.deleteProperty(tasks, action.payload.task.id);

      let selected = state.selected;

      if (selected === action.payload.task.id) {
        selected = Object.keys(tasks)[0];

        if (!selected) {
          const replaceTask = taskReducer(undefined as any, { type: 'reset' });
          selected = replaceTask.id;
          tasks[selected] = replaceTask;
        }
      }

      return {
        selected,
        tasks,
        undo: emptyUndo,
      };

    case 'tasks/undo':
      if (past.length === 0) {
        return state;
      }

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        selected: state.selected,
        tasks: {
          ...state.tasks,
          [state.selected]: previous,
        },

        undo: {
          lastAction: action.type,
          past: newPast,
          future: [state.tasks[state.selected], ...future],
        },
      };

    case 'tasks/redo':
      if (future.length === 0) {
        return state;
      }

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        selected: state.selected,
        tasks: {
          ...state.tasks,
          [state.selected]: next,
        },

        undo: {
          lastAction: action.type,
          past: [...past, state.tasks[state.selected]],
          future: newFuture,
        },
      };

    default:
      const task = state.tasks[state.selected];

      if (!task) {
        return state;
      }

      const updatedTask = taskReducer(task, action);

      if (updatedTask === task) {
        return state;
      }

      let undo = state.undo;
      if (
        UNDO_SKIP_ACTIONS[action.type] &&
        UNDO_SKIP_ACTIONS[action.type] === state.undo.lastAction
      ) {
        undo = {
          lastAction: action.type,
          past,
          future,
        };
      } else {
        undo = {
          lastAction: action.type,
          past: [
            ...(past.length > MAX_UNDO ? past.slice(1, MAX_UNDO) : past),
            task,
          ],
          future: [],
        };
      }

      return {
        selected: updatedTask.id,
        tasks: {
          ...state.tasks,
          [updatedTask.id]: updatedTask,
        },
        undo,
      };
  }
}
