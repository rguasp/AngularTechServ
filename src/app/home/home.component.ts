import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private myService: AuthService, private myRouter: Router ) {}

  user: any;
  title = 'app';
  error: string;

  ngOnInit() {
    // Stores session
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      console.log('home component.ts ', this.myService.currentUser);
      this.user = JSON.parse(sessionStorage.getItem('mySession'));
      this.user = this.myService.currentUser;
      // console.log('User from profile component: ', JSON.parse(this.myService.currentUser._body))
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
      this.myRouter.navigate(['/']);
    });
  }

  logout() {
    console.log('logged out');
    this.myService.logout()
    .subscribe(
      () => {
        localStorage.clear();
        this.user = null;
        this.myRouter.navigate(['/']);
      },
      (err) => this.error = err
  ); }

}
