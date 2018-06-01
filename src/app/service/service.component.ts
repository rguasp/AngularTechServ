import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { serviceService } from '../services/service.service';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { FileSelectDirective } from 'ng2-file-upload';

import { DataService } from '../data.service';


// import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';


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

  allTheItems: Array <any> = [];


  isFormShowing: Boolean = false;
  isFormShowing2: Boolean = false;


  theService: any = {};

  theUpdates: any = {};

  newService: any = {};


  _id: string;

  

  formInfo: any = {username: '', password: '', email: '', cart: [], img: ''};



  itemsInCart: Array <any> = [];

  newItem: any = {};

  itemToAdd: any = {};


  feedback: string;

  user: any;
  itemId: any;

  public selectedService = {};
  public cart = [];


  selectedFile: File = null;

  constructor(
    private serviceRouter: serviceService,
    private myRouter: Router,
    private myService: AuthService,
    private http: HttpClient,
    private _data: DataService
  ) {}




  // onFileSelected(event) {
  //   this.selectedFile = <File>event.target.files[0];
  // }


// onUpload() {
//   const fd = new FormData();
//   fd.append('image', this.selectedFile, this.selectedFile.name);
//    this.http.post('http://localhost:3000/services/services/create', fd, {
//     reportProgress: true,
//     observe: 'events'
//   })
//   .subscribe(event => {
//     if (event.type === HttpEventType.UploadProgress) {
//       console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
//     } else if (event.type === HttpEventType.Response) {
//       console.log(event);
//     }
//   });
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


  //ROLE TOGGLE
  toggleForm() {
    this.isFormShowing = true;
  }
  toggleForm2() {
    this.isFormShowing2 = true;
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
      // console.log(serviceList[0]);
    });
  }

  createService() {
    this.serviceRouter.createNewService(this.newService)
    .subscribe(() => {
      this.getAllTheServices();
    });
    // this.uploader.onBuildItemForm = (item, form) => {
    //   form.append('name', this.newService.name);
    //   form.append('description', this.newService.description);
    //   form.append('price', this.newService.price);
    // };
    // this.uploader.uploadAll();
  }


  giveServiceToModal(theWholeService: string) {
    this.theUpdates = theWholeService;
    console.log("==========giveServiceToModal FUNCTION HIT=========")
    // this.updateService( this.theUpdates);
  }

  updateService(idOfService: string) {
    console.log("==========updateService FUNCTION HIT=========")
    console.log("========this.theUpdates==============>>>>>>");
    console.log(this.theUpdates);
    // console.log("==========idOfService============>>>>>");
    // console.log(idOfService);
    this.serviceRouter.updateService(this.theUpdates)

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

  getOneService(id) {
    console.log('the id from get one service #####################', id);
    this.serviceRouter.getOneService(id)
    .subscribe((oneItem) => {
      console.log('this is just one item _+_+__+_+_+_+_++_+_+_+_', oneItem);
      this.theService = oneItem;
    });
  }


}
