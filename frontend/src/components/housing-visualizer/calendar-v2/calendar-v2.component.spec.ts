/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CalendarV2Component } from './calendar-v2.component';

describe('CalendarV2Component', () => {
  let component: CalendarV2Component;
  let fixture: ComponentFixture<CalendarV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
