import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result';
import { SubAreas } from '../models/sub-areas';

@Injectable({
  providedIn: 'root',
})
export class SubAreaService {
  private url: string = `${environment.urlapi}/SubArea`;

  constructor(private http: HttpClient) {}

  GetSubAreasByArea(areaId: string) {
    return this.http.get<Result<SubAreas[]>>(`${this.url}/GetSubAreasByArea`, {
      params: {
        areaId,
      },
    });
  }
}
