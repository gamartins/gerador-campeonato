import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeagueProvider } from '../../providers/league/league';
import { Match } from '../../model/match';

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
  leagueName = ''
  matches = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public leagueProvider: LeagueProvider) {
  }

  ionViewWillEnter() {
    let leagueId = this.leagueProvider.selectedLeague
    
    this.leagueProvider.getLeague(leagueId).then(league => {
      this.leagueName = league.name
      this.matches = this.divideMatchByGroud(league.matches)
    }).catch(error => {
      this.leagueName = error
    })
  }

  private divideMatchByGroud(matches){
    let groupedMatches = []
    matches.map(match => {
      let round = match.round - 1
      if(groupedMatches[round] == null) groupedMatches[round] = []
      groupedMatches[round].push(match)
    })

    return groupedMatches
  }

}
