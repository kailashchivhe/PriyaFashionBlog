import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyListComponent } from './beauty-list.component';

describe('BeautyListComponent', () => {
  let component: BeautyListComponent;
  let fixture: ComponentFixture<BeautyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
