import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LogPublisherConfig } from './log-publisher-config';
import { LogPublishersService } from './log-publishers.service';

@Injectable({
  providedIn: 'root'
})
export class LogLoaderService {
  public readonly PUBLISHERS_FILE = environment.LOG_LOADER_URL;
  private logPublisherConfigList: Array<LogPublisherConfig>;

  constructor(private http: HttpClient) {
    this.logPublisherConfigList = new Array<LogPublisherConfig>(0);
  }

  public getLogPublisherData(): Array<LogPublisherConfig> {
    return this.logPublisherConfigList;
  }

  load(): Promise<any> {
    // const promise = this.http.get('./assets/log-publishers.json')
    //   .toPromise()
    //   .then(
    //     res => {
    //     this.logPublisherConfigList = res as LogPublisherConfig[];
    //     resolve();
    //   });

    // return promise;
    return new Promise((resolve, reject) => {
      this.http.get(this.PUBLISHERS_FILE).toPromise()
        .then(
          res => {
            this.logPublisherConfigList = res as LogPublisherConfig[];
            resolve(1);
          }
        )
        .catch((err) => console.log(err)
        );
    });
  }

}
