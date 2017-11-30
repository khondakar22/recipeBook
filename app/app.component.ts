import { Component,ViewChild } from '@angular/core';
import { Platform,NavController,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';
import {AuthService} from '../services/auth';
/*import firebase from 'firebase';*/
import * as firebase from 'firebase'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  siginPage:any = SigninPage;
  sigupPage:any = SignupPage;

  isAuthenticated :any = false; 

  @ViewChild('nav') nav:NavController;
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public menuCtr:MenuController,
    public authService:AuthService) {

  firebase.initializeApp({
    apiKey: "AIzaSyA5rU3le5aA-Uuz5YbNEjKYwf6rKsfZMRE",
    authDomain: "recipe-book-295ef.firebaseapp.com",
  });

    firebase.auth().onAuthStateChanged(user =>{
      if(user){
          this.isAuthenticated = true; 
          this.rootPage = TabsPage;
      }else{
        this.isAuthenticated = false; 
        this.rootPage = SigninPage;
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtr.close();
  }
  onLogout(){
     this.authService.logout();
     this.menuCtr.close();
     this.nav.setRoot(SigninPage);
  }
}

