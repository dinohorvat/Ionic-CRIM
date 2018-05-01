import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {ResultDocumentModel} from '../model/ResultDocumentModel';
import {LocationModel} from '../model/LocationModel';

declare var google;

@Injectable()
export class SearchService {

    numResults = 0;
    query: string = "";
    blockUI: boolean = false;
    resultData: ResultDocumentModel[] = Array();
    timeElapsed: number = 0;

    geoQuery: LocationModel = new LocationModel();
    geoSearch: boolean = false;

    // G-MAP
    overlays: any[] = new Array();

    constructor(private http: HttpClient) {
    }

    public searchText(text: string) {
        let url = 'http://35.205.215.195:3000/api/getDocs';
        return this.http.post(url, {query: text}).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
            this.numResults = res.results;
            console.log(res);
            this.setMapMarkers(res.data);
            return res.data as ResultDocumentModel[];
        }).catch(this.handleError);
    }
    public fetchArea(location: LocationModel){
        let url = 'http://35.205.215.195:3000/api/getArea';
        return this.http.post(url, location).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
            this.numResults = res.results;
            this.setMapMarkers(res.data);
            this.setRadius(location.lat, location.long, location.radius);

            return res;
        }).catch(this.handleError);
    }

    public fetchAreaPage(location: LocationModel, pageNum: number){
        let url = 'http://35.205.215.195:3000/api/getArea/' + pageNum;
        return this.http.post(url, location).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
            this.setMapMarkers(res.data);
            this.setRadius(location.lat, location.long, location.radius);
            return res;
        }).catch(this.handleError);
    }

    public fetchPage(pageNum: number, text: string){
        let url = 'http://35.205.215.195:3000/api/getDocs/' + pageNum;
        return this.http.post(url, {query: text}).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
            this.setMapMarkers(res.data);
            return res;
        }).catch(this.handleError);
    }

    fetchDocument(eventid) {
        let url = 'http://35.205.215.195:3000/api/getDocument/' + eventid;
        return this.http.get(url).toPromise().then(result => {
            let res: any = result;
            let document = res.data[0];
            return document as ResultDocumentModel;
        }).catch(this.handleError);
    }

    updateDocument(document) {
        let url = 'http://35.205.215.195:3000/api/updateDocument';
        return this.http.put(url,document).toPromise().then(result => {
            let res: any = result;
            alert(res.message);
            console.log(res);
            return 200;
        }).catch(this.handleError);
    }

    blockUserInterface(): void {
        this.blockUI = true;
    }

    unBlockUserInterface(): void {
        this.blockUI = false;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    public setMapMarkers(dataPoints: any[]){
        this.overlays = new Array();

        for(let idx=0; idx<dataPoints.length; idx++){
            this.overlays.push(new google.maps.Marker({position: {lat: dataPoints[idx].latitude,
                    lng: dataPoints[idx].longitude}, title:dataPoints[idx].attacktype1_txt, eventId: dataPoints[idx].eventid}))
        }
    }

    public setRadius(lat: number, lon: number, rad: number){
        console.log("tu");
        this.overlays.push(new google.maps.Circle({center: {lat: lat, lng: lon},
            fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: rad}))
    }
}
