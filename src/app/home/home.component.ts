import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private myService: AuthService) {}

  // formInfo: any = {username: '', password: '', email: ''};

  // user: any;

  // error: string;

  title = 'app';

  // login() {
  //   this.myService.login(this.formInfo)
  //     .subscribe(
  //       (user) => {this.user = user;
  //         this.formInfo = {}; // clear the input
  //       },
  //       (err) => this.error = err
  //     );
  // }

  // signup() {
  //   // console.log(this.formInfo);
  //   this.myService.signup(this.formInfo)
  //     .subscribe(
  //       (user) => {this.user = user;
  //         console.log(this.user);
  //       },
  //       (err) => this.error = err
  //     );
  // }

  // logout() {
  //   this.myService.logout()
  //   .subscribe(
  //     () => {this.user = null;
  //       this.formInfo = {};
  //     },
  //     (err) => this.error = err
  //   );
  // }

  ngOnInit() {
  }

}
