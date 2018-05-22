import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
