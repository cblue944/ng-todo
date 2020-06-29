import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsBarComponent } from './configurations-bar.component';

describe('ConfigurationsBarComponent', () => {
  let component: ConfigurationsBarComponent;
  let fixture: ComponentFixture<ConfigurationsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
