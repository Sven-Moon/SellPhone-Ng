import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PhoneModel } from '../models/phoneModel';
import { PhoneModels } from "../models/PhoneModels";
import { PhoneTypes } from '../models/PhoneTypes';

@Injectable({
  providedIn: "root"
})
export class EstimatorService {
  constructor (
    private http: HttpClient
  ) {}

  baseUrl: string ="http://localhost:3000/"  
  isValueBoxVisible: boolean = false;

  getPhoneModelsByType():Observable<Array<PhoneModels>> {
    let url=this.baseUrl + "phoneModelsByType";
    let body="";
    let httpOptions: {};

    return this.http.get<any>(url);
  }

  public onPhoneModelSelect(id:number):string{
    if (id > 0 ) {
    this.isValueBoxVisible = true;}
    else { this.isValueBoxVisible = false;}
    return Math.round(id*50 + 50).toString();
  }

}
