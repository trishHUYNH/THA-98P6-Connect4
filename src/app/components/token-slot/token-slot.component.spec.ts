import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenSlotComponent } from './token-slot.component';

describe('TokenSlotComponent', () => {
  let component: TokenSlotComponent;
  let fixture: ComponentFixture<TokenSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
