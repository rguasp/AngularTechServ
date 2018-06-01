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

  allTheItems: Array <any> = [];


  isFormShowing: Boolean = false;
  isFormShowing2: Boolean = false;


  theUpdates: any = {};

  newService: any = {};

  formInfo: any = {username: '', password: '', email: '', cart: []};

  itemsInCart: Array <any> = [];

  newItem: any = {};

  itemToAdd: any = {};

  feedback: string;

  user: any;
  itemId: any;

  public selectedService = {};
  public cart = [];


  constructor(
    private serviceRouter: serviceService,
    private myRouter: Router,
    private myService: AuthService
  ) { }


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


  //ROLE TOGGLE
  toggleForm() {
    this.isFormShowing = !this.isFormShowing;
  }
  toggleForm2() {
    this.isFormShowing2 = !this.isFormShowing2;
  }


  //CART FUNCTIONALITY
  addToCartButton(itemObject) {
      const newItem = itemObject;
      // console.log('item ID ==============>', itemObject)
      // console.log('newItem ===============>', newItem)
      // console.log(`newItem ID ===============>', ${JSON.parse(newItem._id)}`)
      this.myService.addToCart(itemObject)
        .subscribe((service) => {
          // console.log('service after adding to cart function call  >>>>>>>>>>>>', service);
          this.newItem = service;
        });
        // console.log('items in cart ===========',this.newItem)
        // console.log("cart: +++++++++++++" + this.myService.currentUser.cart);
      }

  







  //SERVICE CRUD
  getAllTheServices() {
    console.log('getting all the services');
    this.serviceRouter.getAllServices()
    .subscribe((serviceList) => {
      this.allTheServices = serviceList;
    });
  }

  createService() {
    this.serviceRouter.createNewService(this.newService)
    .subscribe(() => {
      this.getAllTheServices();
    });
  }

  updateService(idOfService) {
    this.serviceRouter.updateService(idOfService , this.theUpdates)
    .subscribe(() => {
      this.getAllTheServices();
    });
  }

  deleteService(idArgument) {
    this.serviceRouter.deleteService(idArgument)
    .subscribe(() => {
      this.getAllTheServices();
    });
  }




}
