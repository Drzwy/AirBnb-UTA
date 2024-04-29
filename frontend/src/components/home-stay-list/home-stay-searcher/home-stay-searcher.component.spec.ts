import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStaySearcherComponent } from './home-stay-searcher.component';

describe('HomeStaySearcherComponent', () => {
  let component: HomeStaySearcherComponent;
  let fixture: ComponentFixture<HomeStaySearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStaySearcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeStaySearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
