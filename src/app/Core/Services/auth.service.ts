import { Injectable } from '@angular/core';
import { CommonHttpRequestsService } from './common-http-requests.service';
import { Login, Register } from '../Models/auth';
import { environment } from 'src/environments/environment';
import { HttPaths } from '../Enums/htt-paths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private commonHttp: CommonHttpRequestsService) { }

  login(loginData: Login) {
    return this.commonHttp.CommonPostRequests(loginData, environment.baseUrl + HttPaths.API_LOGIN_URL);
  }
  createUser(model: Register) {
    return this.commonHttp.CommonPostRequests(model, environment.baseUrl + HttPaths.API_CREATE_USER);
  }
}
