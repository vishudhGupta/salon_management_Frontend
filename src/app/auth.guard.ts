import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('type');

  // Guard for /user route
  if (state.url.startsWith('/user') && userId && userType === 'user') {
    return true;
  }

  // Guard for /superuser route
  if (state.url.startsWith('/superuser') && userId && userType === 'superuser') {
    return true;
  }

  // Not authenticated or unauthorized
  return router.createUrlTree(['/']);
};