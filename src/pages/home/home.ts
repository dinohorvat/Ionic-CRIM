import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NavController } from 'ionic-angular';
import {isNullOrUndefined} from "util";
import {AdvanceSearchModel} from "../../model/AdvanceSearchModel";
import {SearchService} from "../../services/search.service";
import {LocationModel} from "../../model/LocationModel";
import {SearchResultsComponent} from "../results/search-results.component";
import {Geolocation} from "@ionic-native/geolocation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, private searchService: SearchService,
              private cd: ChangeDetectorRef, private geolocation: Geolocation) {

      this.geolocation.getCurrentPosition().then((resp) => {
      this.advanceSearch.latitude = resp.coords.latitude.toString();
      this.advanceSearch.longitude = resp.coords.longitude.toString();
      this.advanceSearch.radius = "10000";
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  text: string = "";

  displayAdvanceSearch = false;
  advanceSearch: AdvanceSearchModel = new AdvanceSearchModel();

  ngOnInit() {

  }

  public querySearch(){
    //search service call code here
    if(!isNullOrUndefined(this.text) && this.text.length > 0){
      this.searchService.query = this.text;
      this.searchService.blockUserInterface();

      this.searchService.geoSearch = false;

      let startTime = (new Date).getTime();
      Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
        this.searchService.unBlockUserInterface();
        this.cd.markForCheck();
        let endTime = (new Date).getTime();

        this.searchService.timeElapsed = endTime - startTime;
        this.navCtrl.push(SearchResultsComponent);
        //this.router.navigate(['main'])

      });
    }
  }

  public searchArea(){
    this.searchService.blockUserInterface();
    let startTime = (new Date).getTime();

    let area = new LocationModel();
    area.radius = parseFloat(this.advanceSearch.radius);
    area.long = parseFloat(this.advanceSearch.longitude);
    area.lat = parseFloat(this.advanceSearch.latitude);

    this.searchService.geoSearch = true;
    this.searchService.geoQuery = area;

    Promise.resolve(this.searchService.fetchArea(area).then(res =>{
      this.searchService.unBlockUserInterface();
      this.cd.markForCheck();
      let endTime = (new Date).getTime();

      this.searchService.timeElapsed = endTime - startTime;
      this.displayAdvanceSearch = false;
      this.navCtrl.push(SearchResultsComponent);
      //this.router.navigate(['main'])

    }).catch(err => {
      console.log(err);
    }));
  }

}
