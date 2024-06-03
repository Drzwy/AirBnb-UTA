/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HousingReservationComponent } from './housing-reservation.component';

describe('HousingReservationComponent', () => {
  let component: HousingReservationComponent;
  let fixture: ComponentFixture<HousingReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HousingReservationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
