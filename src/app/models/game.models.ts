export enum PlayerRole {
  ANSWERER = 'ANSWERER',
  REVIEWER = 'REVIEWER'
}

export interface Player {
  playerId: string;
  name: string;
  role: PlayerRole;
}

export interface Vote {
  playerId: string;
  accepted: boolean;
}

export interface Card {
  id: number;
  question: string;
  answer: string;
}

export interface CardVoteStatus {
  cardId: number;
  votes: Vote[];
}

export interface MultiplayerGameSession {
  sessionId: string;
  players: Player[];
  currentCardIndex: number;
  cards: Card[];
  voteStatuses: CardVoteStatus[];
  gameStarted: boolean;
  gameEnded: boolean;
  cardAnswered: boolean;
}

export interface CreateSessionRequest {
  numberOfCards: number;
}

export interface JoinSessionRequest {
  sessionId: string;
  playerName: string;
}

export interface VoteRequest {
  playerId: string;
  accepted: boolean;
}

export interface VotingStatus {
  votes: number;
  reviewers: number;
}