import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LeaguePage } from '../pages/league/league';
import { MatchPage } from '../pages/match/match';
import { StandingsPage } from '../pages/standings/standings';
import { NewLeaguePage } from '../pages/new-league/new-league';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LeaguePage,
    MatchPage,
    StandingsPage,
    NewLeaguePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, { links: [] })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LeaguePage,
    MatchPage,
    StandingsPage,
    NewLeaguePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
