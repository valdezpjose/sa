import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCantidadComponent } from './dialogo-cantidad.component';

describe('DialogoCantidadComponent', () => {
  let component: DialogoCantidadComponent;
  let fixture: ComponentFixture<DialogoCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoCantidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
