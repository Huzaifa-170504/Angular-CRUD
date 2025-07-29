import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { authState } from 'rxfire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const loginGuard: CanActivateFn = (): Observable<boolean | import('@angular/router').UrlTree> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map(user => {
      if (user) {
        // 🔁 Redirect logged-in users away from login/signup
        return router.createUrlTree(['/']);
      } else {
        // ✅ Allow unauthenticated users to continue
        return true;
      }
    })
  );
};
