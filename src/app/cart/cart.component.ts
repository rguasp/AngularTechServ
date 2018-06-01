import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allItemsInCart: any;
  formInfo: any = {username: '', password: '', email: '', cart: []};
  cartResponse: any;
  thePersonLoggedIn: any;


  constructor(
    private myService: AuthService,
    private myRouter: Router,
  ) { }



  ngOnInit() {

  this.myService.isLoggedIn();


  this.myService.getUserCart()
  .then((serviceResults: any) => {
    console.log('this is the service results {{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}', serviceResults);
    const reply = serviceResults._body;
    this.cartResponse = JSON.parse(reply);
    console.log('cartResponse after parse and stringify -----------______________------------', this.cartResponse)
  })
  .catch((err) => {
    console.log(err);
  });

    // TESTING
    // console.log('============this CURRENT USER ==================')
    // console.log(this.myService.currentUser)
    // console.log('=====thid form info username=========================')
    // console.log(this.formInfo.username)
    // console.log('=====TYPE!=========================')
    // console.log(typeof this.formInfo)
    // TESTING
}



}


