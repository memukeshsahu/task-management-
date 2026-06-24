import { Token } from '@angular/compiler';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  return localStorage.getItem('token') ?
    true : inject(Router)
      .createUrlTree(['/access-denied']);
};
