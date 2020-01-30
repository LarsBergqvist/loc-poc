import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app-config.js';

@Injectable()
export class AppConfigService {
  readonly configFile = 'assets/app-config.json';
  config: AppConfig;

  constructor(  private readonly http: HttpClient) {
  }

  async load(): Promise<any> {
    const configPath = this.configFile;
    return new Promise<any>( (resolve) => {
      this.http.get<AppConfig>(configPath)
      .toPromise()
      .then(res => {
          console.log('loaded app-config.json');
          this.config = res;
          resolve();
      });
    });
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }
  get apiPort(): string {
    return this.config.apiPort;
  }
  get useFakeData(): boolean {
    return this.config.useFakeData;
  }
  get useMap(): boolean {
    return this.config.useMap;
  }
  get googleAPIKey(): string {
    return this.config.googleAPIKey;
  }
}
