import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingInfoDisplayerComponent } from './housing-info-displayer.component';

describe('HousingInfoDisplayerComponent', () => {
  let component: HousingInfoDisplayerComponent;
  let fixture: ComponentFixture<HousingInfoDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousingInfoDisplayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousingInfoDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
