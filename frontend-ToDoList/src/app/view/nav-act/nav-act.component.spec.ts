import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavActComponent } from './nav-act.component';

describe('NavActComponent', () => {
  let component: NavActComponent;
  let fixture: ComponentFixture<NavActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
