export interface IWithId {
  id: string;
}

type IReducer<T> = (state: T, action: any) => T;

type IState<T> = {
  selected: string;
  tasks: { [key: string]: T };
};

interface IAction {
  type: string;
  payload?: any;
}

interface IUndoTask {
  present: {
    id: string;
  };
}

export default function tasks<T extends IUndoTask>(reducer: IReducer<T>) {
  const task = reducer(undefined as any, {});

  const initialState: IState<T> = {
    selected: task.present.id,
    tasks: { [task.present.id]: task },
  };

  return function(state = initialState, action: IAction): IState<T> {
    switch (action.type) {
      default:
        const task = state.tasks[state.selected];

        if (!task) {
          return state;
        }

        const newTask = reducer(task, action);

        if (newTask === task) {
          return state;
        }

        return {
          selected: newTask.present.id,
          tasks: {
            ...state.tasks,
            [newTask.present.id]: newTask,
          },
        };
    }
  };
}
