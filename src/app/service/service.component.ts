import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { serviceService } from '../services/service.service';

import 'rxjs/add/operator/toPromise';
import { FileSelectDirective } from 'ng2-file-upload';

import { DataService } from '../data.service';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})



export class ServiceComponent implements OnInit {



  objectKeys = Object.keys;
  cryptos: any;

  cryptoKeys = Object.keys;
  cryptoCompare: any;

  allTheServices: Array <any> = [];


  isFormShowing: Boolean = false;
  isFormShowing2: Boolean = false;

  theService: any = {};
  theUpdates: any = {};

  newService: any = {};

  formInfo: any = {username: '', password: '', email: '', cart: []};

  public itemsInCart: Array <any> = [];




  feedback: string;

  user: any;

  constructor(
    private serviceservice: serviceService,
    private myRouter: Router,
    private myService: AuthService,
    private _data: DataService
  ) {}


  // addItemToCart(itemId) {
    // console.log("====" + this.newItem);
    // const cartItem = JSON.stringify(this.newItem);
    // this.myService.currentUser.cart.push(this.newItem);
    // this.myService.addToCart(this.itemId);
    // this.itemsInCart = this.myService.currentUser.cart;
    // console.log("items in cart" + this.itemsInCart);
  // }

  ngOnInit() {
    this.getAllTheServices();
    // this.getAllTheItems();
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      this.user = JSON.parse(sessionStorage.getItem('mySession'));
      this.formInfo = this.myService.currentUser;
      this.user = this.myService.currentUser;
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
      // this.myRouter.navigate(['/services']);
    });

    // for cryto
    // setInterval(this._data.getPrices, 7000);
    // setInterval(this._data.priceCompare, 70000);
    // setInterval(() => this._data.getPrices(), 8000);
    // console.log(setInterval);

      this._data.getPrices()
      .subscribe(res => {
        this.cryptos = res;
        console.log('data info >>>>><<<<<<<< ', this._data.getPrices);
      });

      this._data.priceCompare()
      .subscribe(res => {
        this.cryptoCompare = res;
        console.log('crypto compare ======================', this.cryptoCompare);
        // console.log(this.cryptoCompare);
      });



  }

  toggleForm() {
    this.isFormShowing = true;
  }
  toggleForm2() {
    this.isFormShowing2 = true;
  }


  getAllTheServices() {
    this.serviceservice.getAllServices()
    .subscribe((serviceList) => {
      this.allTheServices = serviceList;
      console.log(serviceList[0]);
    });
  }

  createService() {
    this.serviceservice.createNewService(this.newService)
    .subscribe(() => {
      this.getAllTheServices();
    });
  }

  giveServiceToModal(theWholeService){
    this.theUpdates = theWholeService;
  }
  
  updateService(idOfService) {
    this.serviceservice.updateService(idOfService , this.theUpdates)
    .subscribe(() => {
      this.getAllTheServices();
    });
  }

  deleteService(idArgument) {
    this.serviceservice.deleteService(idArgument)
    .subscribe(() => {
      this.getAllTheServices();
    });
  }

  getOneService(id) {
    console.log('the id from get one service #####################', id);
    this.serviceservice.getOneService(id)
    .subscribe((oneItem) => {
      console.log('this is just one item _+_+__+_+_+_+_++_+_+_+_', oneItem);
      this.theService = oneItem;
    });
  }


}
