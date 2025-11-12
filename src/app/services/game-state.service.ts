import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GameState {
  sessionId: string | null;
  playerId: string | null;
  role: string | null;
  playerName: string | null;
  players: any[];
  currentCardIndex: number;
  totalCards: number;
  cardAnswered: boolean;
  hasVoted: boolean;
  currentQuestion: string | null;
  currentAnswer: string | null;
}

const initialState: GameState = {
  sessionId: null,
  playerId: null,
  role: null,
  playerName: null,
  players: [],
  currentCardIndex: 0,
  totalCards: 0,
  cardAnswered: false,
  hasVoted: false,
  currentQuestion: null,
  currentAnswer: null
};

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private stateSubject = new BehaviorSubject<GameState>(initialState);
  public state$ = this.stateSubject.asObservable();

  constructor() {}

  getState(): GameState {
    return this.stateSubject.value;
  }

  setState(newState: Partial<GameState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...newState });
  }

  resetState(): void {
    this.stateSubject.next(initialState);
  }
}