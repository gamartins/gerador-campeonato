import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public leagueProvider: LeagueProvider,
    public alertCtrl: AlertController) {
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

  showSetMatchAlert(match, indexRound, indexMatch) {
    this.alertCtrl.create({
      title: 'Set match',
      inputs: [
        { name: 'homeGoals', placeholder: 'HomePlayer Goals, i.e: 2', type: 'number' },
        { name: 'awayGoals', placeholder: 'AwayPlayer Goals, i.e: 1', type: 'number' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Save', handler: data => this.saveMatch(match, data, indexRound, indexMatch) }
      ]
    }).present()
  }

  saveMatch(match, data, indexRound, indexMatch){
    this.matches[indexRound][indexMatch].homeGoals = data.homeGoals
    this.matches[indexRound][indexMatch].awayGoals = data.awayGoals
    this.leagueProvider.saveLeagueMatches(this.joinAllMatchs(this.matches))
  }

  private joinAllMatchs(matches){
    let joinedMatches = []
    
    matches.forEach(round => {
      round.forEach(match => {
        joinedMatches.push(match)
      });
    });

    return joinedMatches
  }

}
