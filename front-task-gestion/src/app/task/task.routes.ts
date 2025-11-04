import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'historial',
        loadComponent: () => import('./historial-task/historial-task.component').then(m => m.HistorialTaskComponent)
    },
    {
        path: 'gestion',
        loadComponent: () => import('./gestion-task/gestion-task.component').then(m => m.GestionTaskComponent)
    }
];