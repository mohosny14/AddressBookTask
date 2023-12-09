import { Injectable } from '@angular/core';
import { CommonHttpRequestsService } from './common-http-requests.service';
import { HttPaths } from '../Enums/htt-paths';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private commonHttp: CommonHttpRequestsService) { }

  getAllDepartments() {
    return this.commonHttp.CommonGetRequests(environment.baseUrl + HttPaths.API_GET_ALL_DEPARTMENTS);
  }
  createDepartment(model: any) {
    return this.commonHttp.CommonPostRequests(model, environment.baseUrl + HttPaths.API_CREATE_DEPARTMENTS);
  }

  editDepartment(model: any) {
    return this.commonHttp.CommonPutRequests(model, environment.baseUrl + HttPaths.API_EDIT_DEPARTMENTS);
  }

  deleteDepartment(id:number){
    return this.commonHttp.CommonDeleteRequest(environment.baseUrl + HttPaths.API_DELETE_DEPARTMENTS_BY_ID + id);

  }
}
