import { AppConfig } from './../../model/app-config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../../model/common-response';

@Injectable({
  providedIn: 'root'
})
export class ConfigLoaderService {

  private config: AppConfig;

  constructor(private http: HttpClient) {
    this.config = new AppConfig();
  }

  public getConfigData(): AppConfig {
    return this.config;
  }

  load(): Promise<any> {
    console.log(`getting config data`);
    const promise = this.http.get(environment.CONFIG_LOCATION)
      .toPromise()
      .then((settings: CommonResponse<any>) => {
        this.config = settings.result;
        return settings;
      }).catch(this.handleError());

    return promise;
  }

  private handleError(data?: any) {
    return (error: any) => {
      console.log(error);
    };
  }
}
