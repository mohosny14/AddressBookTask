import { Injectable } from '@angular/core';
import { CommonHttpRequestsService } from './common-http-requests.service';
import { HttPaths } from '../Enums/htt-paths';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private commonHttp: CommonHttpRequestsService) { }

  createEmployee(model: FormData) {
    return this.commonHttp.CommonPostRequests(model, environment.baseUrl + HttPaths.API_CREATE_EMPLOYEE);
  }

  getAllEmployeess() {
    return this.commonHttp.CommonGetRequests(environment.baseUrl + HttPaths.API_GET_ALL_EMPLOYEES);
  }
  deleteEmployee(id:number){
    return this.commonHttp.CommonDeleteRequest(environment.baseUrl + HttPaths.API_DELETE_EMPLOYEE_BY_ID + id);

  }
}
