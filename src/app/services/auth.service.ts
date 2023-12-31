import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = 'https://mgrsolaris.com/api';
  private authToken: string | null = null;

  private isLoggedIn = false;
  private user: string | null = null;

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    return headers;
  }

  constructor(private http: HttpClient) {
    // Recuperar informações de autenticação do localStorage ao iniciar o serviço
    this.user = sessionStorage.getItem('user') || null;
    this.isLoggedIn = !!this.user;
  }
  

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
    sessionStorage.removeItem('user');
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  saveAuthInfo(user: string) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getSavedUser(): any | null {
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
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