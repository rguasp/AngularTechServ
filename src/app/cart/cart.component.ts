import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { serviceService } from '../services/service.service';
import { cartService } from '../services/cart.service';


import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemsInCart: Array <object> = [];


  constructor(
    private myService: AuthService
  ) { }




  ngOnInit() {


}


}
