import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerChoiceComponent } from './player-choice.component';

describe('PlayerChoiceComponent', () => {
  let component: PlayerChoiceComponent;
  let fixture: ComponentFixture<PlayerChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
