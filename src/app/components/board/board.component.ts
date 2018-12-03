import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DtMovesService } from '../../services/dt-moves.service';
import { Board } from '../../models/board.model';
import { GameResultsComponent } from '../../dialogs/game-results/game-results.component';
import { PlayerChoiceComponent } from '../../dialogs/player-choice/player-choice.component';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  // 2d array to keep track of moves
  board: Board[][];
  // Counter to keep track of number of moves made
  totalMoves: number;
  // Number array of moves
  movesList: number[]
  // True if user wanted to go first, else false if computer goes first
  @Input() playerOne: boolean;

  @Output() updateGameMessage = new EventEmitter<string>();

  constructor(private dtMovesService: DtMovesService, private dialog: MatDialog) {

  }

  ngOnInit() {
    // Initialize game board
    this.buildBoard();
    // Handle player that goes first
    this.playerChoice();
  }

  /*
  * Clears board
  */
  buildBoard() {

    this.totalMoves = 0;
    this.movesList = [];
    this.board = [];

    for (let i = 0; i < 4; i++) {
      this.board[i] = [];
      for (let j = 0; j < 4; j++) {
        this.board[i].push(new Board(false, i, j, null));
      }
    }
  }

  /*
  * If user selected computer to go first,
  * then call method to get move from service
  */
  playerChoice() {
    if (!this.playerOne) {
      this.updateGameMessage.emit("Computer will go first. Your token color is red.");
      this.dropTokenComputer();
    } else {
      this.updateGameMessage.emit("Make your move. Your token color is red.");
    }
  }

  /**
   * Checks board for winner.
   * If total moves = row * column, then game is tied
   * Else, call service to check rows, columns & diagonal
   */
  checkWinner() {
    if (this.totalMoves == 16) {
      // tie
      this.updateGameMessage.emit("Game is tied!");
      this.openResultsModal("Game is tied!");
    } else {
      let results = this.dtMovesService.checkWinner(this.board);
      if (results.win) {
        if (results.player == 1) {
          this.updateGameMessage.emit("You win!");
          this.openResultsModal("You win!");
        } else if (results.player == 2) {
          this.updateGameMessage.emit("You lose!");
          this.openResultsModal("You lose!");
        }
      } else if (!results.win) {
        // No win, get next move from API call
        if (this.playerOne) {
          // User just went, computer goes now
          this.updateGameMessage.emit("Computer is making a move...");
          this.playerOne = false;
          this.dropTokenComputer();
        } else if (!this.playerOne) {
          // Computer lost, user goes now
          this.updateGameMessage.emit("Make your move.");
          this.playerOne = true;
        }

      }
    }
  }

  /**
   * Shows modal that displays game results
   * Asks user if they want to play again
   */
  openResultsModal(resultMessage: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '250px';
    dialogConfig.maxWidth = '400px';
    dialogConfig.data = { result: resultMessage };

    const dialogRef = this.dialog.open(GameResultsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playerOne = null;
        this.openPlayerChoiceDialog();
      }
    });
  }

/**
 * Displays modal to ask user if they want to go first,
 * or let computer go first
 */
  openPlayerChoiceDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '250px';
    dialogConfig.maxWidth = '400px';

    const dialogRef = this.dialog.open(PlayerChoiceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.playerOne = result;
      this.buildBoard();
      this.playerChoice()
    });
  }

  /**
   * Calls service to retrieve next move
   * Goes through board bottoms up to find next spot
   * in board that is available
   */
  dropTokenComputer() {
    this.dtMovesService.getNextMove(this.movesList)
      .subscribe((moves: number[]) => {
        let lastMove = moves[moves.length - 1];

        for (let i = this.board.length - 1; i >= 0; i--) {
          if (!this.board[i][lastMove].filled) {
            this.board[i][lastMove].filled = true;
            this.board[i][lastMove].player = 2;
            break;
          }
        }
        this.movesList.push(lastMove);
        this.totalMoves++;
        this.checkWinner();
      });
  }

  /**
   * @param token 
   * User selected spot to drop token.
   * Checks for winner
   * 
   */
  dropToken(token: Board) {

    if (token.filled) {
      this.updateGameMessage.emit("Spot already taken. Please, choose a different move.");
    } else {

      for (let i = this.board.length - 1; i >= 0; i--) {
        if (!this.board[i][token.column].filled) {
          this.board[i][token.column].filled = true;
          this.board[i][token.column].player = 1;
          break;
        }
      }
      // token.filled = true;
      // token.player = 1;
      this.movesList.push(token.column);
      this.totalMoves++;
      this.checkWinner();
    }

  }

}
