import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemsInCart: Array <any> = [];

  newItem: any = {name: '', price: ''};

  constructor(
    private myRouter: Router,
    private myService: AuthService
  ) { }

  getAllTheItems() {
    console.log('getting all the items');
    this.myService.currentUser.addToCart()
    .subscribe((cartList) => {
      this.itemsInCart = cartList;
    });
  }

  ngOnInit() {
    this.getAllTheItems();
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      this.myService.currentUser.cart = this.itemsInCart;
    })
  }

}
