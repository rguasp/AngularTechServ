import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { serviceService } from './services/service.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'service', component: ServiceComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)  
  ],
  providers: [AuthService, serviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
