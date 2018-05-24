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

  formInfo: any = {username: '', password: '', email: ''};

  user: any;

  title = 'app';

  
  ngOnInit() {
    // Stores session
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      this.formInfo = this.myService.currentUser;
      console.log(this.formInfo);
      // this.user = JSON.parse(this.myService.currentUser._body);
      // this.user = this.myService.currentUser;
      // console.log('User from profile component: ', JSON.parse(this.myService.currentUser._body))
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
      this.myRouter.navigate(['/home']);
    });
  }

}
