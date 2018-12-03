import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropTokenGameComponent } from './drop-token-game.component';

describe('DropTokenGameComponent', () => {
  let component: DropTokenGameComponent;
  let fixture: ComponentFixture<DropTokenGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropTokenGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropTokenGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
