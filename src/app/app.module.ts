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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'profile',  component: UserProfileComponent },
  { path: 'services',  component: OfferedServicesComponent },
  { path: 'products',  component: ProductsListComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    OfferedServicesComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
