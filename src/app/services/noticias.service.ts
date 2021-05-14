import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseTopHeadlines } from '../pages/interfaces/interfaces';

const apiKey: string = environment.apiKey;
const apiUrl: string = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private url: string = 'https://newsapi.org/v2/';

  constructor(private http: HttpClient) { }

  getTopHeadlinesCategory(category: string) {
    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=mx&category=${category}`);
  }

  getTopHeadlines() {
    return this.executeQuery<ResponseTopHeadlines>('/top-headlines?country=mx');
  }

  private executeQuery<T>(query: string) {
    
    query = apiUrl + query;

    return this.http.get<T>(query, {headers: headers});
  }
}