import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http.get(`${environment.securedAPIBaseURL}/v1/users/user/info`);
  }
}
