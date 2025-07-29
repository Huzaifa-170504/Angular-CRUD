import { Routes } from '@angular/router';

// 🔐 Import Auth Guards
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

// ✅ Final Route Configuration
export const routes: Routes = [
  // 🔓 Public Routes (Only for Unauthenticated Users)
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login').then(m => m.Login),
    canActivate: [loginGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/auth/signup/signup').then(m => m.Signup),
    canActivate: [loginGuard]
  },

  // 🔒 Protected Routes (Only for Authenticated Users)
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    canActivate: [authGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./components/create/create').then(m => m.Create),
    canActivate: [authGuard]
  },
  {
    path: 'read',
    loadComponent: () => import('./components/read/read').then(m => m.Read),
    canActivate: [authGuard]
  },
  {
    path: 'update/:id',
    loadComponent: () => import('./components/update/update').then(m => m.Update),
    canActivate: [authGuard]
  },
  {
    path: 'delete/:id',
    loadComponent: () => import('./components/delete/delete').then(m => m.Delete),
    canActivate: [authGuard]
  },

  // 🔁 Wildcard fallback — redirects to home if no route matches
  {
    path: '**',
    redirectTo: ''
  }
];
