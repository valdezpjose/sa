import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEditorialComponent } from './perfil-editorial.component';

describe('PerfilEditorialComponent', () => {
  let component: PerfilEditorialComponent;
  let fixture: ComponentFixture<PerfilEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
