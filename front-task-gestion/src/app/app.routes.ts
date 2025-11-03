import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'task',
        loadChildren: () => import('./task/task.routes').then(m => m.routes)
    }
];
