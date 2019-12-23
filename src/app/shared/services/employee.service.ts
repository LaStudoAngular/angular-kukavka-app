import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IEmployee } from '../interfaces/IEmployee';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<IEmployee[]> {
    return this.http
      .get<IEmployee[]>(`${environment.baseURL}/employees`)
      .pipe(catchError(this.handleError));
  }

  public getEmployee(index: number): Observable<IEmployee> {
    return this.http
      .get<IEmployee>(`${environment.baseURL}/employees/${index}`)
      .pipe(catchError(this.handleError));
  }

  public addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http
      .post<IEmployee>(`${environment.baseURL}/employees`, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  public updateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http
      .put<IEmployee>(`${environment.baseURL}/employees/${employee}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  public deleteEmployee(index: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.baseURL}/${index}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error', errorResponse.error);
    } else {
      console.error('Server Side Error', errorResponse);
    }
    return throwError('This is the problem with the service');
  }
}
