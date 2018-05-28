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

  // uploader: FileUploader = new FileUploader({
  //   url: `/services/`
  // });

  allTheServices: Array <any> = [];

  isFormShowing: Boolean = false;

  newService: any = {name: '', description: '', img: ''};

  formInfo: any = {username: '', password: '', email: ''};

  feedback: string;

  user: any;
  currentUser: any;

  constructor(
    private serviceservice: serviceService,
    private myRouter: Router,
    private myService: AuthService
  ) { }

  ngOnInit() {
    // this.uploader.onSuccessItem = (item, response) => {
    //   this.feedback = JSON.parse(response).message;
    // };

    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   this.feedback = JSON.parse(response).message;
    // };
    this.getAllTheServices();
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      this.formInfo = this.myService.currentUser;
      this.user = this.myService.currentUser;
    })
    .catch( err => {
      console.log('error while accessing unauthorized stuff: ', err);
      this.myRouter.navigate(['/services']);
    });
  }

  toggleForm() {
    this.isFormShowing = !this.isFormShowing;
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
    // this.uploader.uploadAll();
  }

  // updateService(){
  //   this.serviceservice.updateService()
  //   .subscribe(() => {
  //     this.getAllTheServices();
  //   });


  // }

  deleteService(idArgument) {
    this.serviceservice.deleteService(idArgument)
    .subscribe(() => {
      this.getAllTheServices();
    });
  }




}
