import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateSessionRequest,
  JoinSessionRequest,
  VoteRequest,
  VotingStatus
} from '../models/game.models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/game';

  constructor(private http: HttpClient) {}

  createSession(request: CreateSessionRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/start-session`, request);
  }

  joinSession(request: JoinSessionRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/join-session`, request);
  }

  getCard(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/card/${sessionId}`);
  }

  markAnswerShown(sessionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/answer/${sessionId}`, {});
  }

  submitVote(sessionId: string, request: VoteRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote/${sessionId}`, request);
  }

  getVotingStatus(sessionId: string): Observable<VotingStatus> {
    return this.http.get<VotingStatus>(`${this.apiUrl}/votes/${sessionId}`);
  }

  nextCard(sessionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/next-card/${sessionId}`, {});
  }
}