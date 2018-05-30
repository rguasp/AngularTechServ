import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class cartService {

  constructor(private http: Http) { }

//   addToCart() {
//     return this.http.post('http://localhost:3000/api/cart/:id/add', {withCredentials: true})
//     .map((responseFromApi) => responseFromApi.json());
//     }

  getUserCart() {
    return this.http.get('http://localhost:3000/cart/:id', {withCredentials: true})
    .map((responseFromApi) => responseFromApi.json());
  }


}
