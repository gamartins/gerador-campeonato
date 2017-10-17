import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { League } from '../../model/league';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class LeagueProvider {
  leagueList: FirebaseListObservable<any>;
  selectedLeague = null

  constructor(
    public db: AngularFireDatabase,
    public authProvider: AuthProvider) {
      console.log(this.authProvider.uid)
      this.leagueList = this.db.list(`/${this.authProvider.uid}/leagues`)
  }

  public createLeague(leagueForm) {
    const league = new League(leagueForm.name, leagueForm.membersName, leagueForm.leagueType)
    this.leagueList.push(league)
  }

  public getLeague(leagueId: string): Promise<any> {
    if (leagueId === null || leagueId.trim() == '') {
      return Promise.reject('No league selected')
    } else {
      this.selectedLeague = leagueId
      let league: League
      this.leagueList.forEach(leagues => {
        league = leagues.filter(value => value.$key === leagueId)[0]
      })
  
      return Promise.resolve(league)
    }
  }

  public saveLeagueMatches(matches){
    let league = this.db.list(`/${this.authProvider.uid}/leagues/${this.selectedLeague}`)
    league.update('matches', matches).catch(error => console.log(error))
  }

}
