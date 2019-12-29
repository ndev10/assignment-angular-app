import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { of, Observable } from "rxjs";
import { catchError, mapTo, tap } from "rxjs/operators";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { TokenDetails } from "./token.details.model";

export const IGNORE_TOKEN = "ignoreToken";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<boolean> {
    const body = new HttpParams()
      .set("username", user.username)
      .set("password", user.password)
      .set("grant_type", "password")
      .set("client_id", environment.clientId);
    const httpHeader = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded; charset=utf-8")
      .append(
        "Authorization",
        "Basic " + btoa(`${environment.clientId}:${environment.clientSecret}`)
      );
    return this.http
      .post<TokenDetails>(
        `${environment.oauthAPIBaseURL}/oauth/token`,
        body.toString(),
        { headers: httpHeader }
      )
      .pipe(
        tap(tokenDetails => this.storeTokens(tokenDetails)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  private storeTokens(tokenDetails: TokenDetails) {
    localStorage.setItem(this.JWT_TOKEN, tokenDetails.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokenDetails.refresh_token);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  refreshToken() {
    const refreshTokenUrl = environment.oauthAPIBaseURL + "/oauth/token";
    const params = new HttpParams().set(IGNORE_TOKEN, "true");

    const body = new HttpParams()
      .set("grant_type", "refresh_token")
      .set("client_id", environment.clientId)
      .set("refresh_token", this.getRefreshToken());
    const httpHeader = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded; charset=utf-8")
      .append(
        "Authorization",
        "Basic " + btoa(`${environment.clientId}:${environment.clientSecret}`)
      );
    return this.http
      .post<TokenDetails>(refreshTokenUrl, body.toString(), {
        headers: httpHeader,
        params
      })
      .pipe(
        tap((tokens: TokenDetails) => {
          this.storeTokens(tokens);
        })
      );
  }
}
