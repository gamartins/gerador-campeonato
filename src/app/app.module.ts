import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LeaguePage } from '../pages/league/league';
import { MatchPage } from '../pages/match/match';
import { StandingsPage } from '../pages/standings/standings';
import { NewLeaguePage } from '../pages/new-league/new-league';
import { environment } from '../environments/environment';
import { LeagueProvider } from '../providers/league/league';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
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
    LeagueProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
