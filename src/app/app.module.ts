import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShowListPageModule } from '../pages/show-list/show-list.module';
import { ItemProvider } from '../providers/item/item';
import { ListProvider } from '../providers/list/list';
import { LoginPageModule } from '../pages/login/login.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';

const firebaseConfig = {
  fire :{
    apiKey: 'AIzaSyCLeQxZ78r5AzywGZU7Hlpj-VoRZgQHR6Y',
    authDomain: 'tpdm-c2652.firebaseapp.com',
    databaseURL: 'https://tpdm-c2652.firebaseio.com/',
    projectId: 'tpdm-c2652',
    storageBucket: 'tpdm-c2652.appspot.com'
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ShowListPageModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule.enablePersistence(), 
    AngularFireAuthModule,
    LoginPageModule,
    HttpModule,
    HttpClientModule  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItemProvider,
    ListProvider,
    { provide: FirestoreSettingsToken, useValue: {} } 
  ]
})
export class AppModule {}
