import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8081'

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  )

  constructor(
    private httpCLient: HttpClient,
    private userAuthService: UserAuthService
  ) { }

  public login(loginData: any) {
    return this.httpCLient.post(this.baseUrl + "/authenticate", loginData, { headers: this.requestHeader })
  }

  public forUser(){
    return this.httpCLient.get(this.baseUrl + "/forUser", {
      responseType: 'text'
    })
  }

  public forAdmin(){
    return this.httpCLient.get(this.baseUrl + "/forAdmin", {
      responseType: 'text'
    })
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false
    const userRoles: any = this.userAuthService.getRoles()

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if(userRoles[i].roleName === allowedRoles[j]){
            isMatch = true
            return isMatch
          }
          else{
            return isMatch
          }
        }
      }
    }
    return false
  }
}
