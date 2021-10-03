import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementSiteComponent } from './event-management-site.component';

describe('EventManagementSiteComponent', () => {
  let component: EventManagementSiteComponent;
  let fixture: ComponentFixture<EventManagementSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventManagementSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManagementSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
