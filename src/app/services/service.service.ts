import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService} from '../services/auth.service';


@Injectable()
export class serviceService {
  currentUser: any;

  item: any;


  constructor(
    private http: Http,
    private userService: AuthService
    ) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getAllServices() {
    return this.http.get(`${environment.backendUrl}/services/services`)
    .map((responseFromApi) => responseFromApi.json());
  }

  getOneService(id) {
    return this.http.get(`${environment.backendUrl}/services/services/${id}`)
    .map((responseFromApi) => responseFromApi.json());
  }

  createNewService(theWholeServiceObject) {
    return this.http.post(`${environment.backendUrl}/services/services/create`, theWholeServiceObject)
    .map((responseFromApi) => responseFromApi.json());
  }

  deleteService(id) {
    return this.http.post(`${environment.backendUrl}/services/services/delete/${id}`, {})
    .map((responseFromApi) => responseFromApi.json());
  }


  updateService(theUpdates) {
    console.log('update service in services.ts ===========>>> 😁😁😁😁😁😁')
    console.log(theUpdates)

    console.log('This is THE ID =====>');
    console.log(theUpdates._id);

    return this.http.post(`${environment.backendUrl}/services/services/update/${theUpdates._id}`, theUpdates)

    .map((responseFromApi) => responseFromApi.json());
  }

  addToCart(itemId) {
    return this.http.put(`${environment.backendUrl}/api/cart/${itemId}/add`, {withCredentials: true})
    .map((responseFromApi) => responseFromApi.json());
      // console.log("Items added to cart");
    }
}

