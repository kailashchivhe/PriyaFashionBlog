import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestyleListComponent } from './lifestyle-list.component';

describe('LifestyleListComponent', () => {
  let component: LifestyleListComponent;
  let fixture: ComponentFixture<LifestyleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifestyleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestyleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
