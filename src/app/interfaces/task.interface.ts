export interface Task {
  id?: number;
  title: string;
  expiryDate: string;
  done: boolean;
}

export interface TasksState {
  tasks: Task[];
}
