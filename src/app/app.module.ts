import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { OfferedServicesComponent } from './offered-services/offered-services.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceComponent } from './service/service.component';
import { serviceService } from './services/service.service';
import { Router } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { reviewService } from './services/review.service';
import { AboutPageComponent } from './about-page/about-page.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { FileSelectDirective } from 'ng2-file-upload';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  // { path: 'editService',  component: EditServiceComponent },
  { path: 'about',  component: AboutPageComponent },
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
    // OfferedServicesComponent,
    ProductsListComponent,
    SignupComponent,
    LoginComponent,
    ServiceComponent,
    ReviewsComponent,
    AboutPageComponent,
    FileSelectDirective,
    // EditServiceComponent
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
