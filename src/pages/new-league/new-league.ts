import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { LeagueProvider } from '../../providers/league/league';

@Component({
  selector: 'page-new-league',
  templateUrl: 'new-league.html',
})
export class NewLeaguePage {
  private newLeagueForm : FormGroup;
  private leagueTypes = [
    { name: 'Round-robin', value: 0 },
  ]

  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private leagueProvider: LeagueProvider,) {
    this.initializeForm()
  }

  initializeForm(){
    this.newLeagueForm = this.formBuilder.group({
      name: ['', Validators.required ],
      members: [ 4, Validators.required ],
      leagueType: [ 0, Validators.required ],
      membersName: this.formBuilder.array([])
    });

    this.initializeMembersArray(this.newLeagueForm.controls.members.value)
    this.newLeagueForm.controls.members.valueChanges.subscribe(value => {
      this.initializeMembersArray(value)
    })
  }

  initializeMembersArray(membersNumber: number){
    this.newLeagueForm.controls['membersName'] = this.formBuilder.array([])
    const control = <FormArray>this.newLeagueForm.controls['membersName'];    
    for (var index = 0; index < membersNumber; index++) {
      control.push(this.formBuilder.group({ name: [ '', Validators.required ] }))
    }
  }

  addNewLeague() {
    this.leagueProvider.createLeague(this.newLeagueForm.value)
    this.navCtrl.pop()
  }

}
