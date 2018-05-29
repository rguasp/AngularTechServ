import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { serviceService } from '../services/service.service';

import 'rxjs/add/operator/toPromise';
import { FileSelectDirective } from 'ng2-file-upload';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  allTheServices: Array <any> = [];


  isFormShowing: Boolean = false;
  isFormShowing2: Boolean = false;


  theUpdates: any = {};

  newService: any = {};

  formInfo: any = {username: '', password: '', email: '', cart: []};

  public itemsInCart: Array <any> = [];




  feedback: string;

  user: any;

  constructor(
    private serviceservice: serviceService,
    private myRouter: Router,
    private myService: AuthService
  ) { }


  addItemToCart(itemId) {
    // console.log("====" + this.newItem);
    // const cartItem = JSON.stringify(this.newItem);
    // this.myService.currentUser.cart.push(this.newItem);
    this.myService.addToCart(this.itemId);
    // this.itemsInCart = this.myService.currentUser.cart;
    // console.log("items in cart" + this.itemsInCart);
  }

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
  }

  toggleForm() {
    this.isFormShowing = !this.isFormShowing;
  }
  toggleForm2() {
    this.isFormShowing2 = !this.isFormShowing2;
  }


  getAllTheServices() {
    console.log('getting all the services');
    this.serviceservice.getAllServices()
    .subscribe((serviceList) => {
      this.allTheServices = serviceList;
    });
  }

  createService() {
    this.serviceservice.createNewService(this.newService)
    .subscribe(() => {
      this.getAllTheServices();
    });
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




}
