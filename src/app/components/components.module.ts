import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TooltipModule} from 'ng2-tooltip-directive';

import {EloChartComponent} from './elo-chart/elo-chart';
import {GameBoardComponent} from './game-board/game-board.component';
import {GameCardComponent} from './game-card/game-card.component';
import {GameJoinButtonComponent} from './game-join-button/game-join-button.component';
import {GameComponent} from './game/game.component';
import {GiveClueComponent} from './give-clue/give-clue.component';
import {PregameComponent} from './pregame/pregame.component';
import {RoomListItemComponent} from './room-list-item/room-list-item.component';
import {TeamListsComponent} from './team-lists/team-lists.component';
import {TimerComponent} from './timer/timer.component';
import {TitleBarComponent} from './title-bar/title-bar.component';
import {UsersComponent} from './users/user.component';
import {WordHistoryComponent} from './word-history/word-history.component';


@NgModule({
  declarations: [
    GameBoardComponent,
    GameComponent,
    GiveClueComponent,
    UsersComponent,
    GameJoinButtonComponent,
    PregameComponent,
    TimerComponent,
    UsersComponent,
    TitleBarComponent,
    TeamListsComponent,
    WordHistoryComponent,
    GameCardComponent,
    EloChartComponent,
    RoomListItemComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TooltipModule.forRoot({
      'placement': 'bottom',
      'hide-delay': 0,
      'displayTouchscreen': false,
    }),
  ],
  exports: [
    GameBoardComponent,
    GameComponent,
    GiveClueComponent,
    UsersComponent,
    GameJoinButtonComponent,
    PregameComponent,
    TimerComponent,
    UsersComponent,
    TitleBarComponent,
    TeamListsComponent,
    WordHistoryComponent,
    GameCardComponent,
    EloChartComponent,
    RoomListItemComponent,
  ]
})
export class ComponentsModule {
}
