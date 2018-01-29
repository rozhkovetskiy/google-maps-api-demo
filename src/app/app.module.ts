import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './main/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { GoogleMapsService } from './shared/services/google-maps.service';
import { LoaderComponent } from './loader/loader.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoaderComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    GoogleMapsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
