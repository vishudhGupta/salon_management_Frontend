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
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    localStorage.removeItem('token'); // optional, if using JWT
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId'); // or check 'token'
  }

  getUserType(): string | null {
    return localStorage.getItem('type');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

