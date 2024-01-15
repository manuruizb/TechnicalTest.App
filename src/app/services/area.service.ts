import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Areas } from '../models/areas';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private url: string = `${environment.urlapi}/Area`;

  constructor(private http: HttpClient) {}

  GetAreasByCountry(countryId:string) {
    return this.http.get<Result<Areas[]>>(`${this.url}/GetAreasByCountry`, {
      params:{
        countryId
      }
    });
  }
}
