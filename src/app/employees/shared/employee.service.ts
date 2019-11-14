import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


import {Employee} from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList: Employee[];
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public url = 'http://localhost:63467/api'; // Jc aqui debes colocar la dirección de tu web api

  constructor(private httpClient: HttpClient) { }

  postEmployee(emp: Employee) {

    return this.httpClient
    .post<any>(`${ this.url }/Employees`, emp, {
      headers: this.headers
    })
    .pipe(
      map(dato => dato)
    );
  }

  putEmployee(id: number, emp: Employee) {
    return this.httpClient.put(`${ this.url }/Employees/${ id }`,
      emp, {
        headers: this.headers
      })
      .pipe(
        map(dato => dato)
      );
  }

  getEmployeeList() {
    return this.httpClient
      .get<Employee[]>(
        `${ this.url }/Employees`
      )
      .pipe(
        map(dato => this.employeeList = dato)
      );
  }

  deleteEmployee(id: number) {
    return this.httpClient
      .delete<any>(
        `${ this.url }/Employees/${ id }`
      )
      .pipe(
        map(dato => dato)
      );
  }
}
