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
    });
    return headers;
  }

 //chamada de API usando o token de autorização
  GetUserbyCode(email: string, password: string) {
    const body = { email: email, password: password };
    return this.http.post(this.apiurl + '/login', body);
  }

  Getall() {
    const headers = this.getHeaders();
    return this.http.get(this.apiurl + '/user', { headers });
  }
}