import { createAction, props } from '@ngrx/store';
import { Task } from '../../interfaces/task.interface';
import { ActionTypes } from '../../enums/action-types-enum';

export const LoadingOnTasks = createAction(ActionTypes.LOADING_ON_TASKS);

export const GetTasks = createAction(
  ActionTypes.GET_TASKS,
  props<{ tasks: Task[] }>()
);

export const DeleteTask = createAction(
  ActionTypes.DELETE_TASK,
  props<{ data: number }>()
);

export const EditTask = createAction(
  ActionTypes.EDIT_TASK,
  props<{ data: Task }>()
);

export const AddTask = createAction(
  ActionTypes.ADD_TASK,
  props<{ data: Task }>()
);
