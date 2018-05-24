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

  isFormShowing: Boolean = false;

  newService: any = {name: '', description: ''};

  user: any;
  currentUser: any;

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

  ngOnInit() {
    this.getAllTheServices();
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      console.log(this.myService.currentUser);
      this.user = this.myService.currentUser;
      // console.log('User from profile component: ', JSON.parse(this.myService.currentUser._body))
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
      this.myRouter.navigate(['/services']);
    });
  }

}
