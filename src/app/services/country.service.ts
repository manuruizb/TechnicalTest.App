import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result';
import { Countries } from '../models/countries';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url: string = `${environment.urlapi}/Country`;

  constructor(private http: HttpClient) {}

  GetAllCountries() {
    return this.http.get<Result<Countries[]>>(`${this.url}/GetAllCountries`);
  }
}
