import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/interfaces/task.interface';
import { dateValidator } from 'src/app/utils/validators.ts/date-validator';

@Component({
  selector: 'app-edit-date-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-date-popup.component.html',
  styleUrls: ['./edit-date-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDatePopupComponent implements OnChanges {
  @Input() editedTask: Task | undefined;

  @Output() editDate = new EventEmitter<Task>();

  editDateForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editedTask) this.initForm();
  }

  initForm(): void {
    this.editDateForm = this.formBuilder.group({
      expiryDate: [
        this.dateFormatter(this.editedTask?.expiryDate!),
        [Validators.required, dateValidator()],
      ],
    });
  }

  dateFormatter(date: string): string {
    let formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  }

  submit(): void {
    const editedTask = {
      ...this.editedTask!,
      expiryDate: this.editDateForm?.get('expiryDate')?.value,
    };
    this.editDate.emit(editedTask);
  }
}
