import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SearchService} from "../services/search.service";
import {HttpClientModule} from "@angular/common/http";
import {SearchResultsComponent} from "../pages/results/search-results.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {TabViewModule} from "primeng/primeng";
import {GMapModule} from "primeng/gmap";
import {NgxPaginationModule} from "ngx-pagination";
import {Geolocation} from "@ionic-native/geolocation";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    NgxPaginationModule,
    TabViewModule,
    GMapModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchResultsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SearchService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
