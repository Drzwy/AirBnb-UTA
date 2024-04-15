import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseVisualizerComponent } from './house-visualizer.component';

describe('HouseVisualizerComponent', () => {
  let component: HouseVisualizerComponent;
  let fixture: ComponentFixture<HouseVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseVisualizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
