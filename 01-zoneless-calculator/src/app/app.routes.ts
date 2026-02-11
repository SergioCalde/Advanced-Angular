import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () => import('./calculator/pages/calculator-page/calculator-page'),
  },
  {
    path: '**',
    redirectTo: 'calculator',
  }
];


