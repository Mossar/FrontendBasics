import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class RestService {

  private rest: string;
  private token: string;

  constructor(private http: Http) {
    this.rest = environment.backendUrl + "/api/";
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(retrievedToken: string) {
    this.token = retrievedToken;
  }

  public get(params: any) {
    return this.http.get(this.rest + params.method,{
      search: this.createSearchParams(params.data)
    })
      .map((response: Response) => response.json())
  }

  public authGet(params: any) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);

    return this.http.get(this.rest + params.method,{
      search: this.createSearchParams(params.data),
      headers: headers
    })
      .map((response: Response) => response.json())
  }

  public post(params: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(params.data);

    return this.http.post(this.rest + params.method, body,{
      headers: headers
    })
      .map((response: Response) => response.json())
  }

  public authPost(params: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);

    const body = JSON.stringify(params.data);

    return this.http.post(this.rest + params.method, body,{
      headers: headers
    })
      .map((response: Response) => response.json())
  }

  private createSearchParams(params: any) : URLSearchParams {
    let searchParams = new URLSearchParams();
    for (let param in params) {
      searchParams.set(param, params[param]);
    }
    return searchParams;
  }
}
