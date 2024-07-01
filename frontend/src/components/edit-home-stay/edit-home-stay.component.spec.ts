import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomeStayComponent } from './edit-home-stay.component';

describe('EditHomeStayComponent', () => {
  let component: EditHomeStayComponent;
  let fixture: ComponentFixture<EditHomeStayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHomeStayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHomeStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
