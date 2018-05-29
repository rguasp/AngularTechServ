import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class serviceService {
  currentUser: any;


  constructor(
    private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getAllServices() {
    return this.http.get('http://localhost:3000/services/services')
        .map((responseFromApi) => responseFromApi.json());
  }
  createService(theWholeTaskObject) {
    return this.http.post('http://localhost:3000/services/create', theWholeTaskObject)
    .map((responseFromApi) => responseFromApi.json());
  }



  addToCart(item) {
    return this.http.put('http://localhost:3000/api/cart/:id/add', item, {withCredentials: true})
    // .map((responseFromApi) => responseFromApi.json());
    //   this.currentUser.cart.unshift(this.item);
    //   // this.currentUser.cart.unshift(this.item);
    //   console.log("Items added to cart");
    }

  getUserCart() {
    return this.http.get('http://localhost:3000/services/userCart', {withCredentials: true})
    .map((responseFromApi) => responseFromApi.json());
  }
}

