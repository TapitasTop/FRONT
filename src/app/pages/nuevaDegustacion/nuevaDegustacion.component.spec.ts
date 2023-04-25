import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaDegustacionComponent } from './nuevaDegustacion.component';

describe('NuevaDegustacionComponent', () => {
  let component: NuevaDegustacionComponent;
  let fixture: ComponentFixture<NuevaDegustacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaDegustacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaDegustacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
