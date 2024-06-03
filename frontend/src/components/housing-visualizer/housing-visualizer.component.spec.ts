import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingVisualizerComponent } from './housing-visualizer.component';

describe('HouseVisualizerComponent', () => {
  let component: HousingVisualizerComponent;
  let fixture: ComponentFixture<HousingVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousingVisualizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousingVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
