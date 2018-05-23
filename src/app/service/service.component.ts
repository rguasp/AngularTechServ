import { Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { serviceService } from '../services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  allTheServices: Array <any> = [];

  constructor(
    private serviceservice: serviceService,
    private router: Router
  ) { }

  getAllTheServices(){
    console.log("getting all the services");
    this.serviceservice.getAllServices()
    .subscribe((serviceList) => {
      this.allTheServices = serviceList;
    })
  }

  ngOnInit() {
    this.getAllTheServices()
  }

}
