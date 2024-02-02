import { Action } from '@ngrx/store';
import { TasksService } from './../../services/tasks.service';
import { map, mergeMap } from 'rxjs/operators';
import { GetTasks } from './../actions/tasks.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActionTypes } from 'src/app/enums/action-types-enum';

@Injectable()
export class TasksEffects {
  constructor(private actions: Actions, private tasksService: TasksService) {}

  private getTasks$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ActionTypes.LOADING_ON_TASKS),
      mergeMap(() =>
        this.tasksService.getTasks().pipe(map((tasks) => GetTasks({ tasks })))
      )
    )
  );
}
