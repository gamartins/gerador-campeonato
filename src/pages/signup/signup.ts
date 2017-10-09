import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  error = ''
  user = {
    name: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public angularFireAuth: AngularFireAuth) {
  }

  signUp(){
    if (this.isFormValid()) {
      this.angularFireAuth.auth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        this.showMessage('User created successfully!')
        this.navCtrl.pop()
      })
      .catch(error => this.showMessage(error.message))
    } else {
      this.showMessage(this.error)
    }
  }

  isFormValid(): boolean {
    let isValid = true
    console.log(this.user)

    if (this.user.name.trim() == '') {
      isValid = false;
      this.error = "Name can't be empty"
    }

    if (this.user.email != this.user.repeatEmail) {
      isValid = false;
      this.error = 'E-mails are different'
    }

    if (this.user.password != this.user.repeatPassword) {
      isValid = false;
      this.error = 'Passwords are different'
    }

    return isValid
  }

  showMessage(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    }).present();
  }

}
