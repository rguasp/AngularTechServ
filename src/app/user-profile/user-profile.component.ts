
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  formInfo: any = {};

  user: any;

  error: string;


  constructor(
     private myService: AuthService,
     private myRouter: Router
      ) { }



  ngOnInit() {
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      this.formInfo = this.myService.currentUser;
      this.user = JSON.parse(sessionStorage.getItem('mySession'));
      console.log(this.formInfo);
    })
    .catch( err => {
      console.log('error while accessing unauthorized stuff: ', err);
      this.myRouter.navigate(['/']);
    });
  }

  logout() {
    console.log('logged out');
    this.myService.logout()
    .subscribe(
      () => {
        localStorage.clear();
        this.myService.currentUser = null;
        this.user = null;
        this.formInfo = {};
        this.myRouter.navigate(['/']);
      },
      (err) => this.error = err
    );
  } // end logout



}
