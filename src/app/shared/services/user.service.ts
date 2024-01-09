import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USER_API = `${environment.baseURL}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(queryParams?: any) {
    return this.http.get(this.USER_API, { params: queryParams });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.USER_API}/me`);
  }

  updateUser(id: string, userData: FormData): Observable<User> {
    return this.http.patch<User>(`${this.USER_API}/${id}`, userData);
  }
}
