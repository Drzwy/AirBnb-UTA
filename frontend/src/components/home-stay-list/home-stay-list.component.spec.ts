import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStayListComponent } from './home-stay-list.component';

describe('HomeScreenComponent', () => {
  let component: HomeStayListComponent;
  let fixture: ComponentFixture<HomeStayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStayListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeStayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
