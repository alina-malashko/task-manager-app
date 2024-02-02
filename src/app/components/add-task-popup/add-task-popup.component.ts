import { Task } from 'src/app/interfaces/task.interface';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dateValidator } from 'src/app/utils/validators.ts/date-validator';

@Component({
  selector: 'app-add-task-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskPopupComponent implements OnInit {
  @Output() addNewTask = new EventEmitter<Task>();

  newTaskForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      expiryDate: ['', [Validators.required, dateValidator()]],
    });
  }

  submit(): void {
    const newTask = {
      ...this.newTaskForm?.value,
      done: false,
    };
    this.newTaskForm?.reset();
    this.addNewTask.emit(newTask);
  }
}
