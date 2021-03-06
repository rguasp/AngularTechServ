import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable()
export class reviewService {

  constructor(private http: Http) { }

  getAllReviews() {
    return this.http.get(`${environment.backendUrl}/reviews/reviews`)
        .map((responseFromApi) => responseFromApi.json());
  }
}