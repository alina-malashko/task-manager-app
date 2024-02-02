import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import Tasks from '../../mock-db.json';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks using getTasks', () => {
    service.getTasks().subscribe({
      next: (response) => {
        expect(response).toEqual(Tasks);
      },
    });
  });
});
