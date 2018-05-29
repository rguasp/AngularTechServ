import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { AgmCoreModule } from '@agm/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

    formInfo: any = {username: '', password: '', email: ''};


  constructor(
    private myService: AuthService,
    private myRouter: Router
      ) {}

  user: any;
  title = 'app';
  error: string;


// // google maps zoom level
zoom = 10;
// // initial center position for the map
lat = 25.766034;
lng = -80.196191;

// clickedMarker(label: string, index: number) {
//   console.log(`clicked the marker: ${label || index}`);
// }

// mapClicked($event: MouseEvent) {
//   this.markers.push({
//     lat: $event.coords.lat,
//     lng: $event.coords.lng,
//     draggable: true
//   });
// }

// markerDragEnd(m: marker, $event: MouseEvent) {
//   console.log('dragEnd', m, $event);
// }

// markers: marker[] = [
//   {
//     lat: 51.673858,
//     lng: 7.815982,
//     label: 'A',
//     draggable: true
//   }
// ]


  ngOnInit() {
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
    document.getElementById('service-list').removeAttribute('display');
    // document.getElementsByClassName('hide')[1].setAttribute('display', 'none');
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

  );
}

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
        li[i].style.display = 'none';
      } else if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = '';
      } else {
          li[i].style.display = 'none';
      }
  }
}


}



