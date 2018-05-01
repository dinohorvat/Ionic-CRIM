export class ResultDocumentModel{
    attacktype1_txt: string;
    city: string;
    country_txt: string;
    location: string;
    summary: string;
    addnotes: string;
    eventid: string;
    comments: Comment[];
    latitude: number;
    longitude: number;
}
export class Comment{
    name: string;
    comment: string;
}