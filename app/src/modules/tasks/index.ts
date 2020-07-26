import taskReducer, { ITask } from '../task';
import generateId from 'utils/generateId';

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

export default function tasksReducer(
  state: IState | undefined,
  action: IAction,
): IState {
  if (state === undefined) {
    state = ACTION_HANDLERS['tasks/new'](state);
  }

  const handler = ACTION_HANDLERS[action.type] || forwardAction;
  return handler(state, action);
}

const UNDO_EMPTY = {
  lastAction: null,
  past: [],
  future: [],
};

function createNewTask() {
  return {
    id: generateId('task'),
    title: 'Focus',
    todos: [],
    bookmarks: [],
    note: '',
  };
}

const ACTION_HANDLERS: any = {
  'tasks/new': (state: IState | undefined) => {
    const newTask = createNewTask();

    return {
      selected: newTask.id,
      tasks: {
        ...(state?.tasks || {}),
        [newTask.id]: newTask,
      },
      undo: UNDO_EMPTY,
    };
  },

  'tasks/select': (state: IState, action: IAction) => {
    const taskId = action.payload.task.id;

    if (!state.tasks[taskId]) {
      return state;
    }

    return {
      selected: taskId,
      tasks: state.tasks,
      undo: UNDO_EMPTY,
    };
  },

  'tasks/delete': (state: IState, action: IAction) => {
    const taskId = action.payload.task.id;

    if (!state.tasks[taskId]) {
      return state;
    }

    const tasks = { ...state.tasks };

    Reflect.deleteProperty(tasks, taskId);

    let selected = state.selected;

    if (selected === taskId) {
      selected = Object.keys(tasks)[0];

      if (!selected) {
        const newTask = createNewTask();
        selected = newTask.id;
        tasks[selected] = newTask;
      }
    }

    return {
      selected,
      tasks,
      undo: UNDO_EMPTY,
    };
  },

  'tasks/import': (state: IState, action: IAction) => {
    const task = { ...createNewTask(), ...action.payload.task };

    return {
      selected: task.id,
      tasks: {
        ...state.tasks,
        [task.id]: task,
      },
      undo: UNDO_EMPTY,
    };
  },

  undo: (state: IState, action: IAction) => {
    const { past, future } = state.undo;

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
  },

  redo: (state: IState, action: IAction) => {
    const { past, future } = state.undo;

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
  },
};

const MAX_UNDO = 100;

const UNDO_SKIP_ACTIONS = {
  'task/updateTodoText': 'task/newTodo',
  'task/updateBookmark': 'task/newBookmark',
} as any;

function forwardAction(state: IState, action: IAction) {
  const presentTask = state.tasks[state.selected];

  if (!presentTask) {
    return state;
  }

  const updatedTask = taskReducer(presentTask, action);

  if (updatedTask === presentTask) {
    return state;
  }

  let undo = state.undo;

  if (
    UNDO_SKIP_ACTIONS[action.type] &&
    UNDO_SKIP_ACTIONS[action.type] === state.undo.lastAction
  ) {
    undo = {
      ...undo,
      lastAction: action.type,
    };
  } else {
    undo = {
      lastAction: action.type,
      past: [
        ...(undo.past.length > MAX_UNDO
          ? undo.past.slice(1, MAX_UNDO)
          : undo.past),
        presentTask,
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
