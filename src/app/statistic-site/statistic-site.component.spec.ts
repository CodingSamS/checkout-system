import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticSiteComponent } from './statistic-site.component';

describe('StatisticSiteComponent', () => {
  let component: StatisticSiteComponent;
  let fixture: ComponentFixture<StatisticSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
