import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { reviewService } from '../services/review.service';
import { serviceService } from '../services/service.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {


  objectKeys = Object.keys;
  cryptos: any;

  cryptoKeys = Object.keys;
  cryptoCompare: any;

  allTheServices: Array <any> = [];
  id: any;

  theService: any = {};


  constructor(
    private ReviewService: reviewService,
    private route: ActivatedRoute,
    private serviceservice: serviceService,
    private _data: DataService


  ) { }


  getTheService(id) {
    console.log('the id from get one service #####################', id);
    this.serviceservice.getOneService(id)
    .subscribe((oneItem) => {
      console.log('this is just one item _+_+__+_+_+_+_++_+_+_+_', oneItem);
      this.theService = oneItem;
    });
  }

  ngOnInit() {
    this.route.params
    .subscribe((theParams) => {
      const theId = theParams ['id'];
      this.getTheService(theId);
    });
    // for cryto
    // setInterval(this._data.getPrices, 7000);
    // setInterval(this._data.priceCompare, 70000);
    // setInterval(() => this._data.getPrices(), 8000);
    // console.log(setInterval);

    // this.getOneService(this.id);

      this._data.getPrices()
      .subscribe(res => {
        this.cryptos = res;
      });

      this._data.priceCompare()
      .subscribe(res => {
        this.cryptoCompare = res;
        // console.log(this.cryptoCompare);
      });

    }
 




}
