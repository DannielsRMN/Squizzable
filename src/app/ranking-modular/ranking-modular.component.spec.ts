import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingModularComponent } from './ranking-modular.component';

describe('RankingModularComponent', () => {
  let component: RankingModularComponent;
  let fixture: ComponentFixture<RankingModularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingModularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingModularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
