import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//front end promise addition
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  currentUser: any;
  itemId : any;
  userId : any;


  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`http://localhost:3000/api/signup`, user, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }
  setSession(user) {
    sessionStorage.setItem('mySession', JSON.stringify(user));
  }


  login(user) {
    this.currentUser = this.http.post(`http://localhost:3000/api/login`, user, { withCredentials: true })
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
    return this.http.delete(`http://localhost:3000/api/logout`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }


  isLoggedIn() {
    return this.http.get(`http://localhost:3000/api/loggedin`, { withCredentials: true })
      .map(res => {
        this.currentUser = res.json();
      })
      .catch(this.handleError);
  }


  //Called from AddToCart button in service.html page.
  addToCart(itemId) {
    console.log('id from auth service :::::::::::::::::::::::::::::', itemId);
                                                    //TO GET ID//     //BODY//
    return this.http.put(`http://localhost:3000/api/cart/${itemId}/add`, {}, {withCredentials: true})
    .map((res) => res.json());
  }

  //Display cart on cart page
  getUserCart(userId) {
    return this.http.put(`http://localhost:3000/api/cart/${userId}`, {}, {withCredentials: true})
    .map(res => res.json());
    // .map(res => {
    //   this.currentUser.cart.json();
    // })
    // .catch(this.handleError);
  }

  getPrivateData() {
    return this.http.get(`http://localhost:3000/api/private`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }
}
