import {
  DeleteTask,
  EditTask,
  AddTask,
} from './../../store/actions/tasks.action';
import { selectTasks } from './../../store/selectors/tasks.selector';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/interfaces/task.interface';
import { LoadingOnTasks } from 'src/app/store/actions/tasks.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  tasks: Task[] | undefined;

  filteredTasks: Task[] | undefined;

  editedTask: Task | undefined;

  filterByDoneMode: boolean | undefined;

  filterByExpiryDateMode: boolean | undefined;

  subscription: Subscription | undefined;

  constructor(private readonly store: Store, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscription = this.store.select(selectTasks).subscribe((value) => {
      this.tasks = this.sortTasks(value);
      this.filter();
      this.ref.markForCheck();
    });
    const tasks = localStorage.getItem('tasks');
    if (!tasks || JSON.parse(tasks).tasks.length === 0) {
      this.store.dispatch(LoadingOnTasks());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  sortTasks(tasks: Task[]): Task[] {
    const tasksList = [...tasks]
      .sort((a, b) => Number(a.done) - Number(b.done))
      .sort(
        (a, b) =>
          Number(new Date(a.expiryDate)) - Number(new Date(b.expiryDate))
      );
    return tasksList;
  }

  onStatusChange(task: Task): void {
    const editedTask = {
      ...task,
      done: !task.done,
    };
    this.store.dispatch(EditTask({ data: editedTask }));
  }

  onEditDateMode(task: Task): void {
    this.editedTask = task;
  }

  onDateChange(task: Task): void {
    this.store.dispatch(EditTask({ data: task }));
  }

  addTask(task: Task): void {
    this.store.dispatch(AddTask({ data: task }));
  }

  deleteTask(id: number): void {
    this.store.dispatch(DeleteTask({ data: id }));
  }

  filterByDoneModeOn(): void {
    this.filterByDoneMode = !this.filterByDoneMode;
    this.filter();
  }

  filterByExpiryDateModeOn(): void {
    this.filterByExpiryDateMode = !this.filterByExpiryDateMode;
    this.filter();
  }

  filter(): void {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (this.filterByExpiryDateMode && this.filterByDoneMode) {
      let filteredTasks = [...this.tasks!].filter(
        (task) => new Date(task.expiryDate) < today
      );
      filteredTasks = filteredTasks.filter((task) => task.done);
      this.filteredTasks = filteredTasks;
      this.ref.markForCheck();
    } else if (this.filterByExpiryDateMode && !this.filterByDoneMode) {
      const filteredTasks = [...this.tasks!].filter(
        (task) => new Date(task.expiryDate) < today
      );
      this.filteredTasks = filteredTasks;
      this.ref.markForCheck();
    } else if (this.filterByDoneMode && !this.filterByExpiryDateMode) {
      const filteredTasks = [...this.tasks!].filter((task) => task.done);
      this.filteredTasks = filteredTasks;
      this.ref.markForCheck();
    } else {
      this.filteredTasks = [...this.tasks!];
      this.ref.markForCheck();
    }
  }
}
