type IReducer = (a: any, b: any) => any;

interface IAction {
  type: string;
  payload?: any;
}

const MAX_PAST_SIZE = 100;

const SKIP_ACTIONS = {
  'task/updateTodoText': 'task/newTodo',
  'task/updateBookmark': 'task/newBookmark',
} as any;

export default function undoable<T extends IReducer>(reducer: T) {
  const initialState = {
    pastAction: null,
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  return function(state = initialState, action: IAction): any {
    const { past, present, future } = state;

    switch (action.type) {
      case 'undo':
        if (past.length === 0) {
          return state;
        }

        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          pastAction: '',
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      case 'redo':
        if (future.length === 0) {
          return state;
        }

        const next = future[0];
        const newFuture = future.slice(1);
        return {
          pastAction: 'redo',
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
          SKIP_ACTIONS[action.type] === state.pastAction
        ) {
          return {
            past,
            present: newPresent,
            future,
            pastAction: action.type,
          };
        }

        return {
          pastAction: action.type,
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
  return { type: 'redo' };
}

export function undo() {
  return { type: 'undo' };
}
