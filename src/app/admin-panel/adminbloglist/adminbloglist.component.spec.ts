import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbloglistComponent } from './adminbloglist.component';

describe('AdminbloglistComponent', () => {
  let component: AdminbloglistComponent;
  let fixture: ComponentFixture<AdminbloglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbloglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbloglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
