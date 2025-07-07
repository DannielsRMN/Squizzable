import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGeneralComponent } from './ranking-general.component';

describe('RankingGeneralComponent', () => {
  let component: RankingGeneralComponent;
  let fixture: ComponentFixture<RankingGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
