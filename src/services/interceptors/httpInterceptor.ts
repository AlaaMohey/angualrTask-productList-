import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const httpInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
   const toastr = inject(ToastrService); 

  if (request.method === 'DELETE') {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) {
      return new Observable<HttpEvent<any>>();
    }
  }

  return next(request).pipe(
    map((evt) => evt),
    catchError((error: HttpErrorResponse) => {
      console.log(error,'dfwojfijfiwfw')
      switch (error.status) {
        case 401:
          toastr.error('Unauthorized');
          break;
        case 404:
          toastr.error('404 not found');
          break;
        case 500:
          toastr.error('internal server error ');
          break;
        default:
          toastr.error('An unexpected error occurred.', `Error ${error.status}`);
      }

      return throwError(() => error);
    })
  );
};