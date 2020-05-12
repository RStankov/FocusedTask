export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
  ident: number;
  autoCompleted: boolean;
}

export interface IBookmark {
  id: string;
  uri: string;
}

export interface ITask {
  title: string;
  todos: ITodo[];
  bookmarks: IBookmark[];
  note: string;
}

export interface IWithId {
  id: string;
}
