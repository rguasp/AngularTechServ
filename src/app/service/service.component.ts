import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { serviceService } from '../services/service.service';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  // uploader: FileUploader = new FileUploader({
  //   url: `http://localhost:3000/services/services/create`
  // });

  allTheServices: Array <any> = [];


  isFormShowing: Boolean = false;
  isFormShowing2: Boolean = false;




  theUpdates: any = {};

  newService: any = {};

  formInfo: any = {username: '', password: '', email: '', cart: [], img: ''};

  public itemsInCart: Array <any> = [];

  feedback: string;

  user: any;

  selectedFile: File = null;

  constructor(
    private serviceservice: serviceService,
    private myRouter: Router,
    private myService: AuthService,
    private http: HttpClient
  ) { }

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

  addItemToCart(itemId) {
    // console.log("====" + this.newItem);
    // const cartItem = JSON.stringify(this.newItem);
    // this.myService.currentUser.cart.push(this.newItem);
    // this.myService.addToCart(this.itemId);
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

    // this.uploader.onSuccessItem = (item, response) => {
    //   this.feedback = JSON.parse(response).message;
    // };

    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   this.feedback = JSON.parse(response).message;
    // };
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
    // this.uploader.onBuildItemForm = (item, form) => {
    //   form.append('name', this.newService.name);
    //   form.append('description', this.newService.description);
    //   form.append('price', this.newService.price);
    // };
    // this.uploader.uploadAll();
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
