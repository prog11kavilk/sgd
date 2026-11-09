import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'health',
    loadComponent: () => import('./features/health/health-check').then((m) => m.HealthCheck),
  },
];
