import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { serviceService } from '../services/service.service';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

    formInfo: any = {username: '', password: '', email: ''};
    theService: any = {};

  objectKeys = Object.keys;
  cryptos: any;

  cryptoKeys = Object.keys;
  cryptoCompare: any;

  allTheServices: Array <any> = [];
  id: any;

  constructor(
    private myService: AuthService,
    private myRouter: Router,
    private route: ActivatedRoute,
    private serviceservice: serviceService,
    private _data: DataService


      ) {}

  user: any;
  title = 'app';
  error: string;


// // google maps zoom level
zoom = 10;
// // initial center position for the map
lat = 25.766034;
lng = -80.196191;





  getAllTheServices() {
    this.serviceservice.getAllServices()
    .subscribe((serviceList) => {
      this.allTheServices = serviceList;
      console.log(serviceList[0]);
    });
  }


  getTheService(id) {
    console.log('the id from get one service #####################', id);
    this.serviceservice.getOneService(id)
    .subscribe((oneItem) => {
      console.log('this is just one item _+_+__+_+_+_+_++_+_+_+_', oneItem);
      this.theService = oneItem;
    });
  }

  ngOnInit() {

    this.getAllTheServices();

    this.route.params
    .subscribe((theParams) => {
      const theId = theParams ['id'];
      this.getTheService(theId);
    });


    this._data.getPrices()
    .subscribe(res => {
      this.cryptos = res;
    });

    this._data.priceCompare()
    .subscribe(res => {
      this.cryptoCompare = res;
      // console.log(this.cryptoCompare);
    });




    // Stores session
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      console.log('home component.ts ', this.myService.currentUser);

      this.user = JSON.parse(sessionStorage.getItem('mySession'));

      // this.formInfo = this.myService.currentUser;

      this.user = this.myService.currentUser;
      // console.log('User from profile component: ', JSON.parse(this.myService.currentUser._body))
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
      this.myRouter.navigate(['/']);
    });

   
  }


  logout() {
    console.log('logged out');
    this.myService.logout()
    .subscribe(
      () => {
        localStorage.clear();
        this.user = null;
        this.myRouter.navigate(['/']);
      },
      (err) => this.error = err

  ); }


searchFunction($event) {
  // Declare variables
  let input, filter, ul, li, a, i;
  input = document.getElementById('my-input');
  filter = input.value.toUpperCase();
  ul = document.getElementById('service-list');
  li = ul.getElementsByTagName('li');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      if (filter === '' ) {
        // li[i].style.display = 'none';
        li[i].classList.add('hide');
      } else if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          // li[i].style.display = '';
          li[i].classList.remove('hide');
          li[i].classList.add('show');
      } else {
          // li[i].style.display = 'none';
          li[i].classList.add('hide');
      }
  }
}
}





