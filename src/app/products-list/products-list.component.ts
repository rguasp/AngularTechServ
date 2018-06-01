import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  objectKeys = Object.keys;
  cryptos: any;

  cryptoKeys = Object.keys;
  cryptoCompare: any;

  constructor(private _data: DataService) {
    // setInterval(() => { this._data.getPrices(); }, 8000);
    // setInterval(() => { this._data.priceCompare(); }, 8000);
    // setInterval(function() {  }, 8000);
    // console.log('======',  );
   }

  ngOnInit() {

    this._data.getPrices()
    .subscribe(res => {
      this.cryptos = res;
      console.log('data info >>>>><<<<<<<< ', this._data.getPrices);
    });

    this._data.priceCompare()
    .subscribe(res => {
      this.cryptoCompare = res;
      console.log('crypto compare ======================', this.cryptoCompare);
    });

  }

}
