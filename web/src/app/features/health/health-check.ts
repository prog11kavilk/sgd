import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HealthResponse, HealthService } from '../../core/services/health.service';

type Estado = 'carregando' | 'ok' | 'erro';

@Component({
    selector: 'app-health-check',
    imports: [MatCardModule, MatButtonModule],
    template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Conexão com a API</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        @switch (estado()) {
          @case ('carregando') { <p>Consultando…</p> }
          @case ('ok') { <p>A API respondeu: <strong>{{ resposta()?.status }}</strong></p> }
          @case ('erro') { <p>Falha ao chamar a API. Veja a aba Network e o console.</p> }
        }
      </mat-card-content>
      <mat-card-actions>
        <button mat-button type="button" (click)="verificar()">Testar de novo</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class HealthCheck {
    private readonly healthService = inject(HealthService);

    protected readonly estado = signal<Estado>('carregando');
    protected readonly resposta = signal<HealthResponse | null>(null);

    constructor() {
        this.verificar();
    }

    protected verificar(): void {
        this.estado.set('carregando');
        this.healthService.check().subscribe({
            next: (r) => {
                this.resposta.set(r);
                this.estado.set('ok');
            },
            error: () => this.estado.set('erro'),
        });
    }
}