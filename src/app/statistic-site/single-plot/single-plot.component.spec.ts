import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlotComponent } from './single-plot.component';

describe('SinglePlotComponent', () => {
  let component: SinglePlotComponent;
  let fixture: ComponentFixture<SinglePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
