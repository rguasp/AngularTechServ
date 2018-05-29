import { Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { serviceService } from '../services/service.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  allTheServices: Array <any> = [];

  newService: any = {name: '', description: ''};

  formInfo: any = {username: '', password: '', email: '', cart: []};

  public itemsInCart: Array <any> = [];




  user: any;

  constructor(
    private serviceservice: serviceService,
    private myRouter: Router,
    private myService: AuthService
  ) { }

  getAllTheServices() {
    console.log('getting all the services');
    this.serviceservice.getAllServices()
    .subscribe((serviceList) => {
      this.allTheServices = serviceList;
    });
  }

  // getAllTheItems() {
  //   console.log('getting all the items');
  //   this.serviceservice.cart.addToCart()
  //   .subscribe((newItem) => {
  //     this.itemsInCart = newItem;
  //     this.myService.currentUser.cart = this.itemsInCart;
  //   });
  // }

  addItemToCart(itemId) {
    // console.log("====" + this.newItem);
    // const cartItem = JSON.stringify(this.newItem);
    // this.myService.currentUser.cart.push(this.newItem);
    this.myService.addToCart(this.itemId);
    // this.itemsInCart = this.myService.currentUser.cart;
    // console.log("items in cart" + this.itemsInCart);
  }

  // addServiceToCart()


  ngOnInit() {
    this.getAllTheServices();
    // this.getAllTheItems();
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      this.formInfo = this.myService.currentUser;
      this.user = this.myService.currentUser;
      console.log(this.formInfo);
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
      // this.myRouter.navigate(['/services']);
    });
  }

}
