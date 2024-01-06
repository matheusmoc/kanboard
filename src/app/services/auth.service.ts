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

  constructor(private http: HttpClient) {}

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.userId = null;
    this.username = null;
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  saveAuthInfo(userId: string, username: string) {
    this.userId = userId;
    this.username = username;
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('username', username);
  }

  getSavedUserId(): string | null {
    return this.userId || sessionStorage.getItem('userId');
  }

  getSavedUsername(): string | null {
    return this.username || sessionStorage.getItem('username');
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