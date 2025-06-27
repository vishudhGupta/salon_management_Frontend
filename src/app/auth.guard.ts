import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('type');
  const salonId = localStorage.getItem('salonId');
  // Guard for /user route
  if (state.url.startsWith('/user') && userId && userType === 'user') {
    console.log('AuthGuard checking type:', userType);
    return true;
  }

  // Guard for /superuser route
  if (state.url.startsWith('/superuser') && salonId && userType === 'superuser') {
     console.log('AuthGuard checking type:', userType);
    return true;
  }

  // Not authenticated or unauthorized
  return router.createUrlTree(['/']);
};
