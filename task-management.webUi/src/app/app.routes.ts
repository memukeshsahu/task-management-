import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Sidebar } from './components/sidebar/sidebar';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
    { path: "", component: Login },
    {
        path: 'tasks', loadComponent: () => import('./pages/task-list/task-list').then
            (m => m.TaskList),canActivate:[authGuard]
    },
    {
        path: 'access-denied', loadComponent: () => import('./components/access-denied/access-denied').then
            (m => m.AccessDenied)
    }
    // { path: 'dashboard', component: Sidebar }
];
