import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {SearchService} from "../../services/search.service";
import {ResultDocumentModel} from "../../model/ResultDocumentModel";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent implements OnInit {

  p: number = 1;
  display: boolean = false;
  selectedResult: ResultDocumentModel = new ResultDocumentModel();

  comment: Comment = new Comment();
  comments: any = [];

  searchQuery: any = "";
  // G-MAP
  options: any;
  overlays: any[] = new Array();


  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchQuery = this.searchService.query;
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 1
    };
  }

  public getDocument(eventid){
    this.searchService.blockUserInterface();
    Promise.resolve(this.searchService.fetchDocument(eventid)).then(result => {
      this.selectedResult = result;
      console.log(this.selectedResult);
      this.searchService.unBlockUserInterface();
      this.showDialog();
      this.cd.markForCheck();
    });
  }
  showDialog() {
    this.display = true;
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'));
      }, 1);

  }

  getResultData(){
    return this.searchService.resultData;
  }

  getPage(page: number){
    this.searchService.blockUserInterface();

    if(!this.searchService.geoSearch){
      Promise.resolve(this.searchService.fetchPage(page, this.searchService.query)).then(result => {
        // console.log(result);
        this.p = page;
        this.cd.markForCheck();
        this.searchService.unBlockUserInterface();
      });
    }else {
      Promise.resolve(this.searchService.fetchAreaPage(this.searchService.geoQuery, page)).then(result => {
        this.p = page;
        this.cd.markForCheck();
        this.searchService.unBlockUserInterface();
      });
    }
  }

  saveComment(){
    this.comments = this.selectedResult.comments;
    if(isNullOrUndefined(this.comments)){
      this.comments = [];
    }

    this.comments.push(this.comment);
    this.searchService.blockUserInterface();
    let data = {
      id: this.selectedResult.eventid,
      comments: this.comments
    };
    console.log(this.selectedResult);
    Promise.resolve(this.searchService.updateDocument(data)).then(result => {
      this.searchService.unBlockUserInterface();
      this.comment = new Comment();
      this.cd.markForCheck();
    });
  }

  getNumResults(){
    this.cd.markForCheck();
    return this.searchService.numResults;
  }

  getElapsedTime(){
    this.cd.markForCheck();
    return this.searchService.timeElapsed;
  }

  public getTotalCount(){
    return this.searchService.numResults;
  }

  public getOverlays(){
    return this.searchService.overlays;
  }

  public handleOverlayClick(event){
    console.log(event.overlay);
    if(!isNullOrUndefined(event.overlay.eventId)){
      this.getDocument(event.overlay.eventId);
    }
  }
}
