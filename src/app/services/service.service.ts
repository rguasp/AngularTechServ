import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class serviceService {
  currentUser: any;

  constructor(
    private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getAllServices() {
    return this.http.get(`${environment.backendUrl}/services/services`)
    .map((responseFromApi) => responseFromApi.json());
  }
  createNewService(theWholeServiceObject) {
    return this.http.post(`${environment.backendUrl}/services/services/create`, theWholeServiceObject)
    .map((responseFromApi) => responseFromApi.json());
  }

  deleteService(id) {
    return this.http.post(`${environment.backendUrl}/services/services/delete/${id}`, {})
    .map((responseFromApi) => responseFromApi.json());
  }

  updateService(theID, theUpdates) {
    return this.http.post(`${environment.backendUrl}/services/services/update/${theID}`, theUpdates)
    .map((responseFromApi) => responseFromApi.json());
  }

  addToCart(item) {
    return this.http.put(`${environment.backendUrl}/api/cart/id:/add`, item, {withCredentials: true});
    // .map(res => {
    //   // this.currentUser.cart.unshift(this.item);
    //   // this.currentUser.cart.unshift(this.item);
    //   // console.log("Items added to cart");
    // })
    // .catch(this.handleError);
  }

  getUserCart() {
    return this.http.get(`${environment.backendUrl}/services/userCart`, {withCredentials: true})
    .map((responseFromApi) => responseFromApi.json());
  }
}

