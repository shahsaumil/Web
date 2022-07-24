import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
@Injectable({
  providedIn: 'root'
})
export class CardService {

  request_url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  addCreditCard(request:Card) : Observable<any>{
    return this.http.post(this.request_url + "/card",request, {observe:'response'});
  }
}
