import { Component } from '@angular/core';
import { MatchPage } from '../match/match';
import { StandingsPage } from '../standings/standings';
import { LeaguePage } from '../league/league';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  leagueRoot = LeaguePage
  standingsRoot = StandingsPage
  matchRoot = MatchPage

  constructor() {

  }
}