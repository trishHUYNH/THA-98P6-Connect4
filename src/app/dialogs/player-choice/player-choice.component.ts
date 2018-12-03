import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from "@angular/material/dialog";

@Component({
  selector: 'app-player-choice',
  templateUrl: './player-choice.component.html',
  styleUrls: ['./player-choice.component.css']
})
export class PlayerChoiceComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PlayerChoiceComponent>) { }

  ngOnInit() {
  }

  /*
  * Returns true if user want to go first,
  * false if computer goes first
  */
  userGoesFirst(isPlayerOne: boolean): void {
    this.dialogRef.close(isPlayerOne);
  }

}
