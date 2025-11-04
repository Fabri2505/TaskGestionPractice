import { Routes } from '@angular/router';
import { MainLayoutComponent } from './share/main-layout/main-layout.component';
import { NotFoundComponent } from './share/not-found/not-found.component';

export const routes: Routes = [
    {
        path:'',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'task/historial',
                pathMatch: 'full'
            },
            {
                path: 'task',
                loadChildren: () => import('./task/task.routes').then(m => m.routes)
            }
        ]
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    // Wildcard al final
    {
    path: '**',
    redirectTo: '404'
    }
];
