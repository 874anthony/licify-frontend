import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USER_API = `${environment.baseURL}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(queryParams?: any) {
    return this.http.get(this.USER_API, { params: queryParams });
  }
}
