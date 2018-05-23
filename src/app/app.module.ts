import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { OfferedServicesComponent } from './offered-services/offered-services.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

import { ServiceComponent } from './service/service.component';
import { serviceService } from './services/service.service';
import { ReviewsComponent } from './reviews/reviews.component';
import { reviewService } from './services/review.service';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'profile',  component: UserProfileComponent },
  // { path: 'services',  component: OfferedServicesComponent },
  { path: 'products',  component: ProductsListComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'reviews', component: ReviewsComponent }


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    OfferedServicesComponent,
    ProductsListComponent,
    SignupComponent,
    LoginComponent,
    ServiceComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, serviceService, reviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
