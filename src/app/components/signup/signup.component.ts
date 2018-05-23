import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  formInfo: any = {username: '', password: '', email: ''};

  user: any;

  error: string;

  constructor( private myService: AuthService) { }

  ngOnInit() {
  }

  signup() {
    // console.log(this.formInfo);
    this.myService.signup(this.formInfo)
      .subscribe(
        (user) => {this.user = user;
          console.log(this.user);
        },
        (err) => this.error = err
      );
  }

}
