import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'token-slot',
  templateUrl: './token-slot.component.html',
  styleUrls: ['./token-slot.component.css']
})
export class TokenSlotComponent implements OnInit {

  @Input() filled: boolean;

  @Input() player: number;

  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

  setFillColor() {
    if (this.filled && this.player == 1) {
      return {'background-color': '#ea4d4d'};
    } else if (this.filled && this.player == 2) {
      return {'background-color': '#2b7cff'};
    }
  }

}
