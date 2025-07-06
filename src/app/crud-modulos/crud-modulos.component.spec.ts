import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudModulosComponent } from './crud-modulos.component';

describe('CrudModulosComponent', () => {
  let component: CrudModulosComponent;
  let fixture: ComponentFixture<CrudModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudModulosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
