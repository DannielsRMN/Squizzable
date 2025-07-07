import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatillaMenuComponent } from './platilla-menu.component';

describe('PlatillaMenuComponent', () => {
  let component: PlatillaMenuComponent;
  let fixture: ComponentFixture<PlatillaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatillaMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatillaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
