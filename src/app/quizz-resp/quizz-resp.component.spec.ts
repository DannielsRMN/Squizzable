import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzRespComponent } from './quizz-resp.component';

describe('QuizzRespComponent', () => {
  let component: QuizzRespComponent;
  let fixture: ComponentFixture<QuizzRespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizzRespComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
