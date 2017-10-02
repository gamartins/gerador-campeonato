import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewLeaguePage } from '../new-league/new-league';
import { LeagueProvider } from '../../providers/league/league';
import { FirebaseListObservable } from 'angularfire2/database';
import { MatchPage } from '../match/match';

@Component({
  selector: 'page-league',
  templateUrl: 'league.html',
})
export class LeaguePage {
  leagueList = []

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public leagueProvider: LeagueProvider,) {

  }

  ionViewWillEnter() {
    this.leagueList = []
    this.leagueProvider.leagueList.subscribe(data => 
      data.forEach(element => this.leagueList.push(element))
    )

    console.log(this.leagueList)
  }

  openNewLeaguePage() {
    this.navCtrl.push(NewLeaguePage)
  }

  openMatchPage(leagueId: string) {
    this.leagueProvider.selectedLeague = leagueId
    this.navCtrl.parent.select(2)
  }

}
