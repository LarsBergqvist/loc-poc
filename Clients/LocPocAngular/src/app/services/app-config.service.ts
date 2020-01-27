import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../models/app-config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig;
  private configPath = 'assets/app-config.json';

  constructor(private readonly http: HttpClient) {
  }

  async getConfig(): Promise<AppConfig> {
    if (!this.config) {
      await this.load();
    }
    return this.config;
  }

  load(): Promise<void | AppConfig> {
    return this.http.get<AppConfig>(this.configPath)
      .toPromise()
      .then(res => {
        this.config = res;
    });
  }
}
