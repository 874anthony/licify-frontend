import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private PROJECT_API = `${environment.baseURL}/projects`;

  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get(this.PROJECT_API);
  }

  getProjectById(id: string) {
    return this.http.get(`${this.PROJECT_API}/${id}`);
  }

  createProject(project: any) {
    return this.http.post(this.PROJECT_API, project);
  }

  updateProject(id: string, project: any) {
    return this.http.patch(`${this.PROJECT_API}/${id}`, project);
  }
}
