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

  addToCart() {
    return this.http.get('http://localhost:3000/api/cart/create', {withCredentials: true})
    .map(res => {
      this.currentUser.cart.push();
    })
    .catch(this.handleError);
  }
}
