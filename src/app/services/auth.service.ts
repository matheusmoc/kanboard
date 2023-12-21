import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = 'https://mgrsolaris.com/api';
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  // Método para configurar o token de autenticação
  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
      //3|J6pWg8KV0E74rzWcCSn4Azkb8RpstKxqdMEid19pd30b5ec7
    });
    return headers;
  }

 //chamada de API usando o token de autorização
 GetUserbyCode() {
  const headers = this.getHeaders();
  return this.http.get(this.apiurl + '/user', { headers });
}
  Getall() {
    const headers = this.getHeaders();
    return this.http.get(this.apiurl + '/user', { headers });
  }
}