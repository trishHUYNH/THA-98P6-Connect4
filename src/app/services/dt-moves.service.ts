import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

/**
 * Angular encodes brackets. 
 * Handler to replace with regular expression to pass in URL
 */
export class MyCustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  encodeKey(k: string): string {
      return super.encodeKey(k)
          .replace(new RegExp("%5B", "g"), "[")
          .replace(new RegExp("%5D", "g"), "]");
  }
}

@Injectable({
  providedIn: 'root'
})
export class DtMovesService {

  constructor(private http: HttpClient) { }

  gameServiceUrl = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production'

  /**
   * Retrieve next move from service. 
   * Returns array of all total moves.
   * @param moves 
   */
  public getNextMove(moves: number[]): Observable<number[]> {

    let params: HttpParams = new HttpParams({
        encoder: new MyCustomHttpUrlEncodingCodec()
    });

    params = params.append('moves', '[' + moves.toString() + ']');

    return this.http.get<number[]>(this.gameServiceUrl, {params});
  }

  /**
   * Calls helper methods to check rows, columns & diagonal for win
   * If any of the methods retru true, return as a win
   * Else, no win
   * @param board 
   */
  public checkWinner(board: Board[][]) {

    if (this.checkRows(board, 1) || this.checkColumns(board, 1) || this.checkDiagonal(board, 1)) {
      return {'win': true, 'player': 1};
    } else if (this.checkRows(board, 2) || this.checkColumns(board, 2) || this.checkDiagonal(board, 2)) {
      return {'win': true, 'player': 2};
    }
     else {
      return {'win': false, 'player': null};
    }
  }

  /**
   * Iterates through board to see if rows have matches.
   * Checks if spot is filled and all belong to the same player
   * @param board 
   * @param player 
   */
  private checkRows(board: Board[][], player: number): boolean {
      let rows = board.length;
      let columns = board[0].length;

      for (let i = 0; i < rows; i++) {
        let count = 0;
        for (let j = 0; j < columns; j++) {
          if (board[i][j].filled && board[i][j].player == player) {
            count++;
          }
        }
        if (count == rows) {
          return true;
        }
      }
    return false;
  }

  /**
   * Iterates through board to see if columns have matches.
   * Checks if spot is filled and all belong to the same player
   * @param board 
   * @param player 
   */
  private checkColumns(board: Board[][], player: number): boolean {
    let rows = board.length;
    let columns = board[0].length;

    for (let i = 0; i < columns; i++) {
      let count = 0;
      for (let j = 0; j < rows; j++) {
        if (board[j][i].filled && board[j][i].player == player) {
          count++;
        }
      }

      if (count == rows) {
        return true;
      }
    }
    return false;
  }

  /**
   * Iterates through board to see if top-left to bottom-right and bottom-left to top-right have matches.
   * Checks if spot is filled and all belong to the same player.
   * If count equals to number of rows, it's a win.
   * @param board 
   * @param player 
   */
  private checkDiagonal(board: Board[][], player: number): boolean {
    let rows = board.length;

    let leftToRightCount = 0;
    for (let i = 0; i < rows; i++) {
      if (board[i][i].filled && board[i][i].player == player) {
        leftToRightCount++;
      }

      if (leftToRightCount == rows) {
        return true;
      }
    }

    let rightToLeftCount = 0;
    for (let i = 0; i < rows / 2; i++) {
      if (board[i][rows - i - 1].filled && board[i][rows - i - 1].player == player && board[rows - i - 1][i].filled && board[rows - i - 1][i].player == player) {
        rightToLeftCount++;
      }

      if (rightToLeftCount == (rows / 2)) {
        return true;
      }

    }
    return false;
  }
}
