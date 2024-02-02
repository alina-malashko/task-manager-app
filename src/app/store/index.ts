import { TasksState } from './../interfaces/task.interface';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { tasksReducer } from './reducers/tasks.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
  tasks: TasksState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  tasks: tasksReducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['tasks'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];
