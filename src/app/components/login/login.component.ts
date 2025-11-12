import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  playerName: string = '';
  numberOfCards: number = 5;
  sessionId: string = '';
  activeTab: 'create' | 'join' = 'create';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private gameService: GameService,
    private gameStateService: GameStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameStateService.resetState();
  }

  switchTab(tab: 'create' | 'join'): void {
    this.activeTab = tab;
    this.errorMessage = '';
  }

  async createSession(): Promise<void> {
    if (!this.playerName.trim()) {
      this.errorMessage = 'Введите имя';
      return;
    }

    if (this.numberOfCards < 1) {
      this.errorMessage = 'Укажите количество карточек';
      return;
    }

    this.isLoading = true;
    try {
      const response = await this.gameService
        .createSession({ numberOfCards: this.numberOfCards })
        .toPromise();

      this.gameStateService.setState({
        sessionId: response.sessionId,
        playerName: this.playerName,
        totalCards: this.numberOfCards
      });

      await this.joinExistingSession();
    } catch (error: any) {
      this.errorMessage = error?.error?.error || 'Ошибка при создании сессии';
    } finally {
      this.isLoading = false;
    }
  }

  async joinSession(): Promise<void> {
    if (!this.playerName.trim()) {
      this.errorMessage = 'Введите имя';
      return;
    }

    if (!this.sessionId.trim()) {
      this.errorMessage = 'Введите ID сессии';
      return;
    }

    this.gameStateService.setState({
      sessionId: this.sessionId,
      playerName: this.playerName
    });

    await this.joinExistingSession();
  }

  private async joinExistingSession(): Promise<void> {
    this.isLoading = true;
    try {
      const state = this.gameStateService.getState();
      const response = await this.gameService
        .joinSession({
          sessionId: state.sessionId!,
          playerName: state.playerName!
        })
        .toPromise();

      this.gameStateService.setState({
        playerId: response.playerId,
        role: response.role,
        players: response.players
      });

      this.router.navigate(['/waiting']);
    } catch (error: any) {
      this.errorMessage = error?.error?.error || 'Ошибка при присоединении к сессии';
    } finally {
      this.isLoading = false;
    }
  }
}