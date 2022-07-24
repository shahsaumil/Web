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
    console.log(request);
    return this.http.post(this.request_url + "/cards",request, {observe:'response'});
  }
  getCreditCard():Observable<Card[]>{
    return this.http.get<Card[]>(this.request_url + "/getcards");
  }
}
