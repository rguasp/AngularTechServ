import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})



export class DataService {


result: any;

  constructor(private _http: HttpClient) {
    // setInterval(() => { this.getPrices(); }, 8000);
    // setInterval(() => { this.priceCompare(); }, 8000);
    // setInterval(function() {  this.getPrices.bind(this); }, 8000);
  }


  getPrices() {
    return this._http.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,BCH,EOS,
    LTC,ADA,XLM,IOT,TRX,NEO,DASH,XMR,OMG,XEM,VEN,BNB,ETC,BCN,QTUM&tsyms=USD`)
      .map(result => this.result = result);
  }

  priceCompare() {
    return this._http.get(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,XRP,BCH,EOS,
    LTC,ADA,XLM,IOT,TRX,NEO,DASH,XMR,OMG,XEM,VEN,BNB,ETC,BCN,QTUM`)
      .map(result => this.result = result);
  }



}

