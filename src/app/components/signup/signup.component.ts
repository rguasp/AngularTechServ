import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  formInfo: any = {username: '', password: '', email: ''};

  user: any;

  error: string;

  constructor( private myService: AuthService,  private myRouter: Router ) { }

  ngOnInit() {
  }

  signup() {
    // console.log(this.formInfo);
    this.myService.signup(this.formInfo)
      .subscribe(
        (user) => {
          this.user = user;
          // console.log(this.user);
          this.myRouter.navigate(['/profile']);
        },
        (err) => this.error = err
      );
  }

}
