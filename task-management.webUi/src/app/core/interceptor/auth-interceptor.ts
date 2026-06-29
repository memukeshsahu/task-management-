import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';

import { inject } from '@angular/core';

import {
  catchError,
  finalize,
  Observable,
  shareReplay,
  switchMap,
  tap,
  throwError
} from 'rxjs';

import { AuthService } from '../services/auth-service';

let refreshRequest$: Observable<any> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/refresh-token')
  ) {
    return next(req);
  }

  const token = authService.getAccessToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status !== 401) {
        return throwError(() => error);
      }

      return handleRefreshToken(req, next);

    })

  );

};

function handleRefreshToken(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> {

  const authService = inject(AuthService);

  if (!refreshRequest$) {

    refreshRequest$ = authService.refreshAccessToken().pipe(

      tap((response) => {

        authService.saveTokens(
          response.data.token,
          response.data.refreshToken
        );

      }),

      shareReplay(1),

      finalize(() => {

        refreshRequest$ = null;

      })

    );

  }

  return refreshRequest$.pipe(

    switchMap((response) => {

      const clonedRequest = request.clone({

        setHeaders: {

          Authorization: `Bearer ${response.data.token}`

        }

      });

      return next(clonedRequest);

    }),

    catchError(error => {

      authService.logout();

      return throwError(() => error);

    })

  );

}