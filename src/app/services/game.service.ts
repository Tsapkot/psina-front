import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/game';

  constructor(private http: HttpClient) {}

  createSession(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/start-session`, request);
  }

  joinSession(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/join-session`, request);
  }

  getCard(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/card/${sessionId}`);
  }

  markAnswerShown(sessionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/answer/${sessionId}`, {});
  }

  submitVote(sessionId: string, request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote/${sessionId}`, request);
  }

  getVotingStatus(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/votes/${sessionId}`);
  }

  nextCard(sessionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/next-card/${sessionId}`, {});
  }
}