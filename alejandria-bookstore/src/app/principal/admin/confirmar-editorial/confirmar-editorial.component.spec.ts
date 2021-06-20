import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEditorialComponent } from './confirmar-editorial.component';

describe('ConfirmarEditorialComponent', () => {
  let component: ConfirmarEditorialComponent;
  let fixture: ComponentFixture<ConfirmarEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
