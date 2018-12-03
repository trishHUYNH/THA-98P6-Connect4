import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from "@angular/material/dialog";

export interface GameResults {
  result: string;
}

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<GameResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameResults) { }

  ngOnInit() {
  }

  playAgain(userPlaysAgain: boolean) {
    this.dialogRef.close(userPlaysAgain);

  }

}
