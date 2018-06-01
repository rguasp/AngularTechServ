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

  //I THINK I FIXED LOGOUT// NAVBAR NAME LINGERS // NEIL
  // logout(user) {
  //   this.currentUser = this.http.post(`http://localhost:3000/api/logout`, user, { withCredentials: true })
  //   .map(res => res.json())
  //   sessionStorage.clear();
  //   return this.currentUser
  //   .then(
  //     sessionStorage.clear()
  //   )
  //     .catch(this.handleError);
  // }


  isLoggedIn() {
    return this.http.get(`http://localhost:3000/api/loggedin`, { withCredentials: true })
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





  //Display cart on cart-component.ts page
  getUserCart(broGetCurrentUser: any) {
    // console.warn(XMLHttpRequest);


        console.log('=========getUserCart()--Auth Service Activated=======OUTSIDE====')
              console.log('2222222222222222222222  YO YO YO PERSON LOGGED IN !!!!')
              
       console.log(broGetCurrentUser.cart)

    return this.http.get(`http://localhost:3000/api/theCart/${broGetCurrentUser.cart}`, {withCredentials: true})
    .subscribe((res) => {
    console.log('=========getUserCart()--Auth Service Activated=====')
    console.log(res)
    console.log(res.json())
    })
  
    // .map(res => {
    //   this.currentUser.cart = res.cart
    // })
    // .catch(this.handleError)
  };
  





  

  getPrivateData() {
    return this.http.get(`http://localhost:3000/api/private`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }
}
