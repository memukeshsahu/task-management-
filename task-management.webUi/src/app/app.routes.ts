import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Sidebar } from './components/sidebar/sidebar';
import { authGuard } from './core/guard/auth/auth-guard';
import { guestGuard } from './core/guard/guest-guard';
import { TaskCreate } from './pages/task-create/task-create';
import { TaskDetails } from './pages/task-details/task-details';

export const routes: Routes = [
    {
        path: "", component: Login, canActivate: [guestGuard]
    },
    {
        path: 'tasks', loadComponent: () => import('./pages/task-list/task-list').then
            (m => m.TaskList), canActivate: [authGuard]
    },
    {
        path: 'users', loadComponent: () => import('./pages/task-list/task-list').then
            (m => m.TaskList), canActivate: [authGuard]
    },
    {
        path: 'tasks/add-task',
        component: TaskCreate
    },
    {
        path: 'tasks/edit-task',
        component: TaskCreate
    },
    {
        path: 'tasks/edit-task/:id',
        component: TaskCreate
    },
    {
        path: 'tasks/:id',
        component: TaskDetails
    },
    {
        path: 'access-denied', loadComponent: () => import('./components/access-denied/access-denied').then
            (m => m.AccessDenied)
    }
    // { path: 'dashboard', component: Sidebar }
];
