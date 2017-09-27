import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { League } from '../../model/league';

@Injectable()
export class LeagueProvider {
  leagueList: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase,) {
    this.leagueList = this.db.list('/leagues')
  }

  public createLeague(leagueForm) {
    const league = new League(leagueForm.name, leagueForm.membersName, leagueForm.leagueType)
    this.leagueList.push(league)
  }

}
