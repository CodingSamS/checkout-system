import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConfigTableComponent } from './event-config-table.component';

describe('EventConfigTableComponent', () => {
  let component: EventConfigTableComponent;
  let fixture: ComponentFixture<EventConfigTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventConfigTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConfigTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
