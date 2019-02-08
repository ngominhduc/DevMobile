import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { Platform, NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { from } from 'rxjs/observable/from';
import { Token } from '@angular/compiler';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})


export class GoogleLoginComponent {

 user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
              private gplus: GooglePlus,
              private platform: Platform,
              private nav: NavController) {

    this.user = this.afAuth.authState;

  }

  googleLogin(){
    if (this.platform.is('cordova')){
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
  try {

    const gplusUser = await this.gplus.login({
      'webClientId': '331597165697-f2l1750gea7a15isi58gr91k15vebccf.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })

    return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)).then(data=>{
      this.nav.setRoot(HomePage);
    });
  } catch(err) {
    console.log(err)
  }
}

async webGoogleLogin(): Promise<void> {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider).then(data=>{
      this.nav.setRoot(HomePage);
    });
  } catch(err) {
    console.log(err)
  }

}

signOut() {
  this.afAuth.auth.signOut();
}
}
