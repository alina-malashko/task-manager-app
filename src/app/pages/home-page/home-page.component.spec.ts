import { EditDatePopupComponent } from './../../components/edit-date-popup/edit-date-popup.component';
import { AddTaskPopupComponent } from './../../components/add-task-popup/add-task-popup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {
  AddTask,
  DeleteTask,
  EditTask,
} from 'src/app/store/actions/tasks.action';

import { HomePageComponent } from './home-page.component';
import { metaReducers, reducers } from 'src/app/store';
import { Task } from 'src/app/interfaces/task.interface';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [
        AddTaskPopupComponent,
        EditDatePopupComponent,
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      providers: [],
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tasks, filterByDoneMode, and filterByExpiryDateMode on ngOnInit', () => {
    const mockTasks = [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: true,
      },
    ];
    spyOn(store, 'select').and.returnValue(of(mockTasks));
    component.ngOnInit();
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should sort tasks on sortTasks method', () => {
    const unsortedTasks = [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: true,
      },
      {
        id: 2,
        title: 'qui est esse',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: false,
      },
    ];
    const sortedTasks = component.sortTasks(unsortedTasks);
    expect(sortedTasks[0]).toEqual({
      id: 6,
      title: 'dolorem eum magni eos aperiam quia',
      expiryDate: '2023-08-19T00:00:00.000Z',
      done: false,
    });
    expect(sortedTasks[1]).toEqual({
      id: 2,
      title: 'qui est esse',
      expiryDate: '2024-08-19T00:00:00.000Z',
      done: false,
    });
    expect(sortedTasks[2]).toEqual({
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      expiryDate: '2024-08-19T00:00:00.000Z',
      done: true,
    });
  });

  it('should dispatch EditTask action on onStatusChange method', () => {
    const mockTask = {
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      expiryDate: '2024-08-19T00:00:00.000Z',
      done: true,
    };
    const storeSpy = spyOn(store, 'dispatch');
    component.onStatusChange(mockTask);
    expect(storeSpy).toHaveBeenCalledWith(
      EditTask({ data: { ...mockTask, done: !mockTask.done } })
    );
  });

  it('should set editedTask on onEditDateMode method', () => {
    const mockTask = {
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      expiryDate: '2024-08-19T00:00:00.000Z',
      done: true,
    };
    component.onEditDateMode(mockTask);
    expect(component.editedTask).toEqual(mockTask);
  });

  it('should dispatch EditTask action on onDateChange', () => {
    const mockTask: Task = {
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      expiryDate: '2024-08-19T00:00:00.000Z',
      done: true,
    };
    const storeSpy = spyOn(store, 'dispatch');
    component.onDateChange(mockTask);
    expect(storeSpy).toHaveBeenCalledWith(EditTask({ data: mockTask }));
  });

  it('should dispatch AddTask action on addTask', () => {
    const mockTask: Task = {
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      expiryDate: '2024-08-19T00:00:00.000Z',
      done: true,
    };
    const storeSpy = spyOn(store, 'dispatch');
    component.addTask(mockTask);
    expect(storeSpy).toHaveBeenCalledWith(AddTask({ data: mockTask }));
  });

  it('should dispatch DeleteTask action on deleteTask', () => {
    const storeSpy = spyOn(store, 'dispatch');
    component.deleteTask(1);
    expect(storeSpy).toHaveBeenCalledWith(DeleteTask({ data: 1 }));
  });

  it('should toggle filterByDoneMode and call filter on filterByDoneModeOn method', () => {
    const filterSpy = spyOn(component, 'filter');
    component.filterByDoneMode = false;
    component.filterByDoneModeOn();
    expect(component.filterByDoneMode).toBe(true);
    expect(filterSpy).toHaveBeenCalled();
  });

  it('should toggle filterByExpiryDateMode and call filter on filterByExpiryDateModeOn method', () => {
    const filterSpy = spyOn(component, 'filter');
    component.filterByExpiryDateMode = false;
    component.filterByExpiryDateModeOn();
    expect(component.filterByExpiryDateMode).toBe(true);
    expect(filterSpy).toHaveBeenCalled();
  });

  it('should filter tasks by done and expiry date when both filterByExpiryDateMode and filterByDoneMode are true', () => {
    component.filterByExpiryDateMode = true;
    component.filterByDoneMode = true;
    const tasks = [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: true,
      },
      {
        id: 2,
        title: 'qui est esse',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 10,
        title: 'optio molestias id quia eum',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: true,
      },
    ];
    component.tasks = tasks;
    component.filter();
    expect(component.filteredTasks).toEqual([
      {
        id: 10,
        title: 'optio molestias id quia eum',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: true,
      },
    ]);
  });

  it('should filter tasks by expiry date when only filterByExpiryDateMode is true', () => {
    component.filterByExpiryDateMode = true;
    component.filterByDoneMode = false;
    const tasks = [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: true,
      },
      {
        id: 2,
        title: 'qui est esse',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 10,
        title: 'optio molestias id quia eum',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: true,
      },
    ];
    component.tasks = tasks;
    component.filter();
    expect(component.filteredTasks).toEqual([
      {
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 10,
        title: 'optio molestias id quia eum',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: true,
      },
    ]);
  });

  it('should filter tasks by done when only filterByDoneMode is true', () => {
    component.filterByExpiryDateMode = false;
    component.filterByDoneMode = true;
    const tasks = [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: true,
      },
      {
        id: 2,
        title: 'qui est esse',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 10,
        title: 'optio molestias id quia eum',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: true,
      },
    ];
    component.tasks = tasks;
    component.filter();
    expect(component.filteredTasks).toEqual([
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: true,
      },
      {
        id: 10,
        title: 'optio molestias id quia eum',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: true,
      },
    ]);
  });

  it('should not filter tasks when both filterByExpiryDateMode and filterByDoneMode are false', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    component.filterByExpiryDateMode = false;
    component.filterByDoneMode = false;
    const tasks = [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: true,
      },
      {
        id: 2,
        title: 'qui est esse',
        expiryDate: '2024-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: false,
      },
      {
        id: 10,
        title: 'optio molestias id quia eum',
        expiryDate: '2023-08-19T00:00:00.000Z',
        done: true,
      },
    ];
    component.tasks = tasks;
    component.filter();
    expect(component.filteredTasks).toEqual(tasks);
  });
});
