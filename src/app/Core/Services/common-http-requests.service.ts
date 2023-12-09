import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpRequestsService {

  constructor(private http: HttpClient) { }
  //used For Any insert , Update , Search
  CommonPostRequests(model: any, url: string): Observable<any> {
    return this.http.post<any>(`${url}`, model);
  }
  CommonPutRequests(model: any, url: string): Observable<any> {
    return this.http.put<any>(`${url}`, model);
  }

  CommonGetRequests(url: string): Observable<any> {
    return this.http.get<any>(`${url}`);
  }
  CommonDeleteRequest(url: string): Observable<any> {
    return this.http.delete<any>(`${url}`);
  }
}
