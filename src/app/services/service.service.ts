import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class serviceService {

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getAllServices() {
    return this.http.get('http://localhost:3000/services/services')
    .map((responseFromApi) => responseFromApi.json());
  }
  createNewService(theWholeServiceObject) {
    return this.http.post(`http://localhost:3000/services/services/create`, theWholeServiceObject)
    .map((responseFromApi) => responseFromApi.json());
  }

  deleteService(id) {
    return this.http.post(`http://localhost:3000/services/services/delete/${id}`, {})
    .map((responseFromApi) => responseFromApi.json());
  }

  updateService(theID, theUpdates) {
    return this.http.post(`http://localhost:3000/services/services/update/${theID}`, theUpdates)
    .map((responseFromApi) => responseFromApi.json());
  }
}
