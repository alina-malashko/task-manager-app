import { LoadingOnTasks } from './../actions/tasks.action';
import { createReducer, on } from '@ngrx/store';
import { TasksState } from '../../interfaces/task.interface';
import {
  GetTasks,
  DeleteTask,
  EditTask,
  AddTask,
} from '../actions/tasks.action';

const initialState: TasksState = {
  tasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(LoadingOnTasks, (state) => ({
    ...state,
  })),
  on(GetTasks, (state, { tasks }) => ({
    ...state,
    tasks: [...state.tasks, ...tasks],
  })),
  on(DeleteTask, (state, { data }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id != data),
  })),
  on(EditTask, (state, { data }) => {
    const tasksList = state.tasks.map((task) => {
      if (task.id === data.id) {
        return {
          ...task,
          ...data,
        };
      } else {
        return task;
      }
    });
    return {
      ...state,
      tasks: tasksList,
    };
  }),
  on(AddTask, (state, { data }) => ({
    ...state,
    tasks: [
      ...state.tasks,
      {
        id: state.tasks.length,
        ...data,
      },
    ],
  }))
);
