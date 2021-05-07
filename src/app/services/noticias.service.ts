import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ResponseTopHeadlines } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private url: string = 'https://newsapi.org/v2/';

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    return this.http.get<ResponseTopHeadlines>(`${ this.url }top-headlines?country=mx&apiKey=${ environment.apiKey }`);
  }
}
