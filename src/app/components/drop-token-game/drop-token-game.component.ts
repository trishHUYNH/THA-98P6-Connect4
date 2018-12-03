import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from "@angular/material";

import { PlayerChoiceComponent } from '../../dialogs/player-choice/player-choice.component';

@Component({
  selector: 'app-drop-token-game',
  templateUrl: './drop-token-game.component.html',
  styleUrls: ['./drop-token-game.component.css']
})
export class DropTokenGameComponent implements OnInit {

  playerOne: boolean;

  constructor(private dialog: MatDialog) {
    this.openPlayerChoiceDialog()
   }

  ngOnInit() {

  }

  /**
   * Displays modal to ask user if they want to go first,
   * or let computer go first
   */
  openPlayerChoiceDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(PlayerChoiceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.playerOne = result;
    });
  }
}
