import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamiConfigService } from './dynami-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GServiceService {

  constructor(
    private httpClient: HttpClient,
    private loadConfig: DynamiConfigService) { 
      this.loadConfig.loadConfig().then(() => {
        console.log(this.loadConfig.getConfig('baseAPI'));
      });
    }


   get(url: string ): Observable<any> {

    return this.httpClient.get<any>(this.loadConfig.getConfig('baseAPI') + url,);
  }

  getAll(url: string): Observable<any[]> {
    console.log(this.loadConfig.getConfig('baseAPI'))
    return this.httpClient.get<any[]>(this.loadConfig.getConfig('baseAPI') + url);
  }
  post(url: string, body: any): Observable<any> {
    
    return this.httpClient.post<any>(this.loadConfig.getConfig('baseAPI') + url, body);
  }
  put(url: string, body: any): Observable<any> {
    return this.httpClient.put<any>(this.loadConfig.getConfig('baseAPI') + url, body);
  }
  delete(url: string,id:number): Observable<any> {
    return this.httpClient.delete<any>(this.loadConfig.getConfig('baseAPI') + url+id);
  }
}
