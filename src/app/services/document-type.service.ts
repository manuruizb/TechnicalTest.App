import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Result } from '../models/result';
import { DocumentTypes } from '../models/document-types';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  private url: string = `${environment.urlapi}/DocumentType`;

  constructor(private http: HttpClient) {}

  GetAllDocuments() {
    return this.http.get<Result<DocumentTypes[]>>(`${this.url}/GetAllDocuments`);
  }
}
