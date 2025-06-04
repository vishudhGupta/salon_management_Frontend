import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  async loadConfig(): Promise<void> {
    return lastValueFrom(this.http.get('/assets/config/config.json')).then(data => {
      this.config = data;
    });
  }

  get(key: string): any {
    return this.config ? this.config[key] : null;
  }
}
