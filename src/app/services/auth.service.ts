import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = 'https://mgrsolaris.com/api';
  private authToken: string | null = null;

  private isLoggedIn = false;
  private userId: string | null = null;
  private username: string | null = null;

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    return headers;
  }

  constructor(private http: HttpClient) {
    // Recuperar informações de autenticação do localStorage ao iniciar o serviço
    this.userId = localStorage.getItem('userId') || null;
    this.username = localStorage.getItem('username') || null;
    this.isLoggedIn = !!this.userId && !!this.username;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.userId = null;
    this.username = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  saveAuthInfo(userId: string, username: string) {
    this.userId = userId;
    this.username = username;
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
  }

  getSavedUserId(): string | null {
    return this.userId;
  }

  getSavedUsername(): string | null {
    return this.username;
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