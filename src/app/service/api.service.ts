import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns coffeeList
   */
  getCoffeAll() {
    return this.http.get(environment.apiUrl + 'coffees/all', this.httpOptions);
  }
}
