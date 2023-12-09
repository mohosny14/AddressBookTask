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
  createJob(model: any) {
    return this.commonHttp.CommonPostRequests(model, environment.baseUrl + HttPaths.API_CREATE_JOB);
  }

  editJob(model: any) {
    return this.commonHttp.CommonPutRequests(model, environment.baseUrl + HttPaths.API_EDIT_JOB);
  }

  deleteJob(id:number){
    return this.commonHttp.CommonDeleteRequest(environment.baseUrl + HttPaths.API_DELETE_JOB_BY_ID + id);

  }
}
