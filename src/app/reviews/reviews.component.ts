import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { reviewService } from '../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  allTheReviews: Array <any> = [];

  constructor(
    private ReviewService: reviewService,
    private router: Router
  ) { }

  getAllTheReviews(){
    console.log("getting all the reviews");
    this.ReviewService.getAllReviews()
    .subscribe((reviewList) => {
      this.allTheReviews = reviewList;
    })
  }

  ngOnInit() {
    this.getAllTheReviews()
  }

}
