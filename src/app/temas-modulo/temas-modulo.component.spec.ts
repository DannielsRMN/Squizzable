import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasModuloComponent } from './temas-modulo.component';

describe('TemasModuloComponent', () => {
  let component: TemasModuloComponent;
  let fixture: ComponentFixture<TemasModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemasModuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemasModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
