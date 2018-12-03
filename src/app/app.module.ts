import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// App components
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { TokenSlotComponent } from './components/token-slot/token-slot.component';
import { DropTokenGameComponent } from './components/drop-token-game/drop-token-game.component';

// UI components
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material';

// Dialogs
import { PlayerChoiceComponent } from './dialogs/player-choice/player-choice.component';
import { GameResultsComponent } from './dialogs/game-results/game-results.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TokenSlotComponent,
    DropTokenGameComponent,
    PlayerChoiceComponent,
    GameResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlayerChoiceComponent, GameResultsComponent]
})
export class AppModule { }
