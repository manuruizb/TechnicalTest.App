import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url: string = `${environment.urlapi}/Employee`;

  constructor(private http: HttpClient) {}

  GetAllEmployees() {
    return this.http.get<Result<Employee[]>>(`${this.url}/GetAllEmployees`);
  }

  GetEmployeeByDocumentOrName(search:string) {
    return this.http.get<Result<Employee[]>>(`${this.url}/GetEmployeeByDocumentOrName`, {
      params:{
        search
      }
    });
  }

  CreateEmployee(employee:Employee) {
    return this.http.post<Result<boolean>>(`${this.url}/CreateEmployee`, employee);
  }

  UpdateEmployee(employee:Employee) {
    return this.http.put<Result<boolean>>(`${this.url}/UpdateEmployee`, employee);
  }
}
