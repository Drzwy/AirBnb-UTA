import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStayFinderComponent } from './home-stay-finder.component';

describe('HomeStayFinderComponent', () => {
  let component: HomeStayFinderComponent;
  let fixture: ComponentFixture<HomeStayFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStayFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeStayFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
