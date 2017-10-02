import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { League } from '../../model/league';

@Injectable()
export class LeagueProvider {
  leagueList: FirebaseListObservable<any>;
  selectedLeague = null

  constructor(public db: AngularFireDatabase,) {
    this.leagueList = this.db.list('/leagues')
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

}
