import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import { serviceService } from '../services/service.service';
// import { cartService } from '../services/cart.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';




// import 'rxjs/add/operator/toPromise';

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
    // private serviceservice: serviceService
  ) { }


//   getUserCart() {
//   this.myService.getUserCart()
//   .subscribe((cartList) => {
//     // this.cartResponse = cartList;
//     this.allItemsInCart = cartList;
//     console.log("is it working?", this.allItemsInCart);
//   });
// }

// getUserCart() {
//   // this.myService.getUserCart()
//   this.myService.isLoggedIn()
//   .toPromise()
//   .then(() => {
//     // this.cartResponse = cartList;
//     this.myService.getUserCart()
//     //just added
//     this.formInfo = JSON.parse(this.myService.currentUser);


//     this.cartResponse = this.formInfo.cart;
//     //just added
//     this.allItemsInCart = this.myService.currentUser.cart;
//     console.log("is it working?", this.allItemsInCart);
//   })
//   .catch( (err) => {
//     console.log('error while accessing unauthorized stuff: ', err);
//     alert("Must be signed in to access your cart");
//       this.myRouter.navigate(['/signup']);
//   })
// }



  ngOnInit() {
    
  this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
     
      console.log('1111111111 YO YO YO PERSON LOGGED IN !!!!')
       console.log(this.myService.currentUser)

       this.myService.getUserCart(this.myService.currentUser);
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
    });
  


    // this.myService.getUserCart();


    // this.formInfo = this.myService.currentUser;
    // this.formInfo = JSON.parse(this.myService.currentUser);
    // .subscribe((cartList) => {
    //   this.allItemsInCart = cartList;
    //   this.router.navigate(['/services/userCart']);
    //   console.log("is it working?", this.allItemsInCart)
    // })
    // this.myService.currentUser.cart = this.itemsInCart;
    // JSON.stringify(this.itemsInCart);
        console.log('============this CURRENT USER ==================')
    console.log(this.myService.currentUser)
      console.log('=====thid form info username=========================')
       console.log(this.formInfo.username)
    console.log('=====TYPE!=========================')
    console.log(typeof this.formInfo)
}


}
