import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// front end promise addition

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()

export class AuthService {
  currentUser: any;
  itemId : any;
  userId : any;
  currentCart: any;


  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${environment.backendUrl}/api/signup`, user, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }
  setSession(user) {
    sessionStorage.setItem('mySession', JSON.stringify(user));
  }


  login(user) {
    this.currentUser = this.http.post(`${environment.backendUrl}/api/login`, user, { withCredentials: true })
    .map(res => res.json())
    .catch(this.handleError);
    this.currentUser
    .subscribe(
      (theUser) => this.setSession(theUser)
    );
    return this.currentUser;
  }


  logout() {
    this.currentUser = '';
    sessionStorage.clear();
    return this.http.delete(`${environment.backendUrl}/api/logout`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }


  isLoggedIn() {
    return this.http.get(`${environment.backendUrl}/api/loggedin`, { withCredentials: true })
      // .map(userFrombackend => { this.currentUser = userFrombackend, userFrombackend.json(); } )
      .map(res => {
        this.currentUser = res.json();
      })
      .catch(this.handleError);
  }



  //Called from AddToCart button in service.html page.
  addToCart(itemObject) {
    console.log("=======================addToCart(itemObject) GET ID ========");
     console.log(`${itemObject._id}`);
     console.log(`============================================================`);

                                                    //TO GET ID//     //BODY//
    return this.http.put(`http://localhost:3000/api/cart/${itemObject._id}/add`, {}, {withCredentials: true})
    .map((res) => res.json());
  }



  getUserCart() {
    return this.http.get(`http://localhost:3000/api/cart`,
     {withCredentials: true}
     ).toPromise()
  }



  getPrivateData() {
    return this.http.get(`${environment.backendUrl}/api/private`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }
}
