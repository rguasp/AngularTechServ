import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { serviceService } from './services/service.service';
import { reviewService } from './services/review.service';


import * as $ from 'jquery';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  formInfo: any = {username: '', password: '', email: '', cart: []};

  user: any;

  error: string;

  newItem: any;

  cartId: any;

  itemsInCart: any;


constructor(
  private myService: AuthService,
  private myRouter: Router,
  private serviceservice: serviceService,
) {}





ngOnInit() {
  this.myService.isLoggedIn()
  .toPromise()
  .then( () => {
  })
  .catch( err => {
    console.log('error while accessing unothorized stuff: ', err);
    this.myRouter.navigate(['/']);
  });
}

signup() {
  // console.log(this.formInfo);
  this.myService.signup(this.formInfo)
    .subscribe(
      (user) => {
        this.user = user;
        this.formInfo = {}; // clear the input
        // console.log(this.user);
        this.myRouter.navigate(['/profile']);
      },
      (err) => this.error = err
    );
}

login() {
  this.myService.login(this.formInfo)
    .subscribe(
      (user) => {
        this.user = user;
        console.log('user from login component: ', user);
        this.formInfo = {}; // clear the input
        this.myRouter.navigate(['/profile']);
      },
      (err) => this.error = err
    );
} // end login

logout() {
  console.log('logged out');
  this.myService.logout()
  .toPromise()
  .then(
    () => {
      sessionStorage.clear();
      localStorage.clear();
      this.myService.currentUser = null;
      this.user = null;
      this.formInfo = {};
      this.myRouter.navigate(['/']);
    },
    (err) => this.error = err
  );
}


}

