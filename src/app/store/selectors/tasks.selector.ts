import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './../../interfaces/task.interface';

export const selectTasksFeature = createFeatureSelector<TasksState>('tasks');

export const selectTasks = createSelector(
  selectTasksFeature,
  (state: TasksState) => state.tasks
);
