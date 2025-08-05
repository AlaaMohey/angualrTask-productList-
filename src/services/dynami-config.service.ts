import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamiConfigService {
 private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('config/environment.json?v='+new Date().getTime()))
      .then(data => {
        this.config = data;
      })
      .catch(err => {
        console.error('Failed to load config.json', err);
        return Promise.reject(err);
      });
  }

  getConfig(key: string): any {
    return this.config ? this.config[key] : null;
  }

}
