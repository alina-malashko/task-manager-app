import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import Tasks from '../../mock-db.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(Tasks);
  }
}
