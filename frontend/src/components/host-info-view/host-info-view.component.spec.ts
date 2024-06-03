import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostInfoViewComponent } from './host-info-view.component';

describe('HostInfoViewComponent', () => {
  let component: HostInfoViewComponent;
  let fixture: ComponentFixture<HostInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostInfoViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
