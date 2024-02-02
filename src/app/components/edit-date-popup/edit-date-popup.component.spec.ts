import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDatePopupComponent } from './edit-date-popup.component';

describe('EditDatePopupComponent', () => {
  let component: EditDatePopupComponent;
  let fixture: ComponentFixture<EditDatePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditDatePopupComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    });
    fixture = TestBed.createComponent(EditDatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnChanges if editedTask is defined', () => {
    const mockTask = {
      title: 'Task',
      expiryDate: '2024-02-01',
      done: false,
    };
    component.editedTask = mockTask;
    component.ngOnChanges({
      editedTask: {
        currentValue: mockTask,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.editDateForm).toBeDefined();
    expect(component.editDateForm?.get('expiryDate')).toBeTruthy();
  });

  it('should format date using dateFormatter function', () => {
    const date = '2023-08-19T00:00:00.000Z';
    const formattedDate = component.dateFormatter(date);
    expect(formattedDate).toEqual('2023-08-19');
  });

  it('should emit editDate event on submit', () => {
    spyOn(component.editDate, 'emit');
    const date = {
      expiryDate: '2024-02-01',
    };
    component.editDateForm?.setValue(date);
    component.submit();
    expect(component.editDate.emit).toHaveBeenCalled();
  });
});
