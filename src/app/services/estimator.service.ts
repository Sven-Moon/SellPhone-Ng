import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneModels } from '../models/PhoneModels';

@Injectable({
  providedIn: 'root'
})
export class EstimatorService {
  constructor(
    private http: HttpClient
  ) {}

  baseUrl = 'http://localhost:3000/';
  isValueBoxVisible = false;

  getPhoneModelsByType(): Observable<Array<PhoneModels>> {
    const url = this.baseUrl + 'phoneModelsByType';
    return this.http.get<any>(url);
  }

  public onPhoneModelSelect(id: number): string{
    if (id > 0 ) {
    this.isValueBoxVisible = true; }
    else { this.isValueBoxVisible = false; }
    return Math.round(id * 50 + 50).toString();
  }

}
