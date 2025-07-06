import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDEspecializacionesComponent } from './crud-especializaciones.component';

describe('CRUDEspecializacionesComponent', () => {
  let component: CRUDEspecializacionesComponent;
  let fixture: ComponentFixture<CRUDEspecializacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CRUDEspecializacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDEspecializacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
