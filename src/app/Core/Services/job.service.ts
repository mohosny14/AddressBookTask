import { Injectable } from '@angular/core';
import { CommonHttpRequestsService } from './common-http-requests.service';
import { HttPaths } from '../Enums/htt-paths';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private commonHttp: CommonHttpRequestsService) { }

  getAllJobs() {
    return this.commonHttp.CommonGetRequests(environment.baseUrl + HttPaths.API_GET_ALL_JOBS);
  }
}
