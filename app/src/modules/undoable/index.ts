type IReducer<T> = (state: T, action: any) => T;

type IState<T> = {
  lastAction: string | null;
  past: T[];
  present: T;
  future: T[];
};

interface IAction {
  type: string;
  payload?: any;
}

const MAX_PAST_SIZE = 100;

const SKIP_ACTIONS = {
  'task/updateTodoText': 'task/newTodo',
  'task/updateBookmark': 'task/newBookmark',
} as any;

export default function undoable<T>(reducer: IReducer<T>) {
  const initialState = {
    lastAction: null,
    past: [],
    present: reducer(undefined as any, {}),
    future: [],
  } as IState<T>;

  return function(state = initialState, action: IAction): IState<T> {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        if (past.length === 0) {
          return state;
        }

        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          lastAction: action.type,
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      case 'REDO':
        if (future.length === 0) {
          return state;
        }

        const next = future[0];
        const newFuture = future.slice(1);
        return {
          lastAction: action.type,
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      default:
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }

        if (
          SKIP_ACTIONS[action.type] &&
          SKIP_ACTIONS[action.type] === state.lastAction
        ) {
          return {
            lastAction: action.type,
            past,
            present: newPresent,
            future,
          };
        }

        return {
          lastAction: action.type,
          past: [
            ...(past.length > MAX_PAST_SIZE
              ? past.slice(1, MAX_PAST_SIZE)
              : past),
            present,
          ],
          present: newPresent,
          future: [],
        };
    }
  };
}

export function redo() {
  return { type: 'REDO' };
}

export function undo() {
  return { type: 'UNDO' };
}
