import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTypeButtonsComponent } from './home-type-buttons.component';

describe('HomeStaySearcherComponent', () => {
  let component: HomeTypeButtonsComponent;
  let fixture: ComponentFixture<HomeTypeButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTypeButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTypeButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
