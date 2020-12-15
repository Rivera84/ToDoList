import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetClimaComponent } from './widget-clima.component';

describe('WidgetClimaComponent', () => {
  let component: WidgetClimaComponent;
  let fixture: ComponentFixture<WidgetClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetClimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
