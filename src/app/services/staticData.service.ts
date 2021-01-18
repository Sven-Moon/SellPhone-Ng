import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StaticData } from "../models/StaticData";

@Injectable({
  providedIn: "root"
})
export class StaticDataService {
  constructor (
    private http: HttpClient
  ) {}

  baseUrl: string ="http://localhost:3000/"

  getStaticData():Observable<StaticData> {
    let url=this.baseUrl + "staticdata/";
    let body="";
    let httpOptions: {};

    return this.http.get<any>(url);
  }
}