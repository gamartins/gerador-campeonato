import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewLeaguePage } from '../new-league/new-league';

@Component({
  selector: 'page-league',
  templateUrl: 'league.html',
})
export class LeaguePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,) {
  }

  openNewLeaguePage() {
    this.navCtrl.push(NewLeaguePage)
  }

}
