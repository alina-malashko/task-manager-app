import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AddTaskPopupComponent } from './add-task-popup.component';

describe('AddTaskPopupComponent', () => {
  let component: AddTaskPopupComponent;
  let fixture: ComponentFixture<AddTaskPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddTaskPopupComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    });
    fixture = TestBed.createComponent(AddTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.newTaskForm).toBeDefined();
    expect(component.newTaskForm?.get('title')).toBeTruthy();
    expect(component.newTaskForm?.get('expiryDate')).toBeTruthy();
  });

  it('should emit addNewTask event on submit', () => {
    spyOn(component.addNewTask, 'emit');
    const task = {
      title: 'Task',
      expiryDate: '2024-02-01',
    };
    component.newTaskForm?.setValue(task);
    component.submit();
    expect(component.addNewTask.emit).toHaveBeenCalled();
  });
});
