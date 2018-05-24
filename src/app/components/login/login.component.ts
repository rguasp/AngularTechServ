import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formInfo: any = {username: '', password: '', email: ''};

  user: any;

  error: string;


  constructor( private myService: AuthService, private myRouter: Router ) { }

  ngOnInit() {
  }

  login() {
    console.log();
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
    console.log('loged out');
    this.myService.logout()
    .subscribe(
      () => {
        localStorage.clear();
        this.user = null;
        this.formInfo = {};
        this.myRouter.navigate(['/']);
      },
      (err) => this.error = err
    );
  }
}
