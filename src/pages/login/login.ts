import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = { email: '', password: ''}

  constructor(
    private authProvider: AuthProvider,
    private navCtrl: NavController,
    private toastCtrl: ToastController,) {  
  }

  ionViewWillEnter(){
    this.loadTabsPageWhenLogged()
  }

  signin() {
    this.authProvider.loginWithEmailAndPassword(this.user.email, this.user.password).then(data => {
      this.loadTabsPageWhenLogged()
    }).catch(error => {
      this.presentToast(error.message)
      console.log(error)
    })
  }

  loadSignupPage(){
    this.navCtrl.push(SignupPage)
  }

  loadTabsPageWhenLogged() {
    if(this.authProvider.isUserSignIn())
      this.navCtrl.push(TabsPage)
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    }).present();
  }

}
